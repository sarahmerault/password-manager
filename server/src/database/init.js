import path from 'path';
import Database from 'better-sqlite3';



let database;



const __dirname = import.meta.dirname;
const DATABASE_PATH = path.join(__dirname, "../../data/password-manager.db");




export function getDatabase() {
    if (database) {
        
        return database;
    }

    database = new Database(DATABASE_PATH);
    database.pragma("journal_mode = WAL");
    database.pragma("foreign_keys = ON");
    initializeTables(database);

    console.log("Database initaliser");

    return database;


}



function initializeTables(database) {
    database.exec(`
    
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    auth_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    username VARCHAR(255),
    email VARCHAR(255),
    service_name VARCHAR(255) NOT NULL,
    encrypted_data VARCHAR(255) NOT NULL,
    iv VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`);
}

export { database }




