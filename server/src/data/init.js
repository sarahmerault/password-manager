import path from 'path';
import Database from 'better-sqlite3';

const database = new Database('foobar.db', options);
const DATABASE_PATH = path.join(__dirname, "../../data/password-manager.db");




export function getDatabase() {
    if (database) {
        return database;
    }

    database = new Database(DATABASE_PATH);
    database.pragma("journal_mode = WAL");
    database.pragma("foreign_keys = ON");
    initializeTables(database);

    return database;
}



function initializeTables(database) {
    database.exec(`
    
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT UNIQUE NOT NULL,
    auth_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    service_name TEXT NOT NULL,
    encrypted_data TEXT NOT NULL,
    iv TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`);
}

export { database }




