use actix_web::{post, web, HttpResponse, Responder};
use chrono::Utc;
use std::fs::OpenOptions;
use std::io::Write;
use crate::models::contact::{ContactForm, ContactMessage};

#[post("/api/contact")]
pub async fn contact(form: web::Json<ContactForm>) -> impl Responder {
    let msg = ContactMessage {
        name: form.name.clone(),
        email: form.email.clone(),
        phone: form.phone.clone(),
        company: form.company.clone(),
        service: form.service.clone(),
        message: form.message.clone(),
        created_at: Utc::now(),
    };

    if let Err(e) = save_message_to_file(&msg) {
        eprintln!("❌ Failed to write log: {}", e);
    }

    let send_result = send_to_telegram(&msg).await;

    match send_result {
        Ok(_) => HttpResponse::Ok().json(serde_json::json!({
            "status": "success",
            "message": format!(
                "Thank you for contacting us, {}. We’ll get back to you soon!☺️",
                form.name
            )
        })),
        Err(e) => {
            eprintln!("❌ Failed to send Telegram message: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "status": "error",
                "message": "Failed to send message. Please try again later."
            }))
        }
    }
}

fn save_message_to_file(msg: &ContactMessage) -> Result<(), String> {
    let json_line =
        serde_json::to_string(msg).map_err(|e| format!("Serialize error: {}", e))?;

    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open("messages.jsonl")
        .map_err(|e| format!("File open error: {}", e))?;

    writeln!(file, "{}", json_line)
        .map_err(|e| format!("Write error: {}", e))?;

    Ok(())
}

async fn send_to_telegram(msg: &ContactMessage) -> Result<(), String> {
    let bot_token = std::env::var("TELEGRAM_BOT_TOKEN")
        .map_err(|_| "Missing TELEGRAM_BOT_TOKEN env var".to_string())?;
    let chat_id = std::env::var("TELEGRAM_CHAT_ID")
        .map_err(|_| "Missing TELEGRAM_CHAT_ID env var".to_string())?;

    let text = format!(
        "📩 *New Monsun Message*\n\n\
         👤 *Name:* {}\n\
         📧 *Email:* {}\n\
         📱 *Phone:* {}\n\
         🏢 *Company:* {}\n\
         ⚙️ *Service:* {}\n\
         💬 *Message:* {}\n\
         🕒 *Sent at:* {}",
        msg.name,
        msg.email,
        msg.phone,
        msg.company,
        msg.service,
        msg.message,
        msg.created_at
    );

    let url = format!("https://api.telegram.org/bot{}/sendMessage", bot_token);

    let response = reqwest::Client::new()
        .post(&url)
        .json(&serde_json::json!({
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "Markdown"
        }))
        .send()
        .await
        .map_err(|e| format!("Request error: {}", e))?;

    if response.status().is_success() {
        Ok(())
    } else {
        let status = response.status();
        let body = response.text().await.unwrap_or_default();
        Err(format!("Telegram API error {}: {}", status, body))
    }
}