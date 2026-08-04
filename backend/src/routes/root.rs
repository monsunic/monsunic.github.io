use actix_web::{get, HttpResponse, Responder};

#[get("/")]
pub async fn index() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "service": "Monsun API",
        "status": "running",
        "version": "1.0.0",
        "author": "Tyo Suwignyo",
        "contact": "tyo.suwignyo@gmail.com"
    }))
}