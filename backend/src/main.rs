pub mod routes;
pub mod models;
pub mod utils;

use actix_cors::Cors;
use actix_web::{middleware::Logger, App, HttpServer};
use routes::init_routes;
use utils::logger::init;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();
    init();

    println!("🚀 Starting Monsun API... (no database)");

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header(),
            )
            .configure(init_routes)
    })
    .bind((
        "0.0.0.0",
        std::env::var("PORT")
            .unwrap_or_else(|_| "8000".to_string())
            .parse::<u16>()
            .unwrap(),
    ))?
    .run()
    .await
}