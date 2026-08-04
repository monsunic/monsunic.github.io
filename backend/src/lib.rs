// use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
// use std::env;
// use dotenvy::dotenv;

// pub type DbPool = Pool<Postgres>;

// pub async fn connect_db() -> DbPool {
//     dotenv().ok();
//     let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

//     PgPoolOptions::new()
//         .max_connections(5)
//         .connect(&database_url)
//         .await
//         .expect("Failed to connect to PostgreSQL")
// }
pub fn init_lib() {
    println!("🧩 Monsun backend initialized (no database).");
}