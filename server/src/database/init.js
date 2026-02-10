import path from 'path';
import Database from 'better-sqlite3';
import fs from "fs";


let database;

//crée le chemin pour la db 
const __dirname = import.meta.dirname;
const DATABASE_PATH = path.join(__dirname, "../../../data/password-manager.db");
const database_init= path.join(__dirname, "../../../data/init.sql")


//Singleton, crée la fonction si elle n'est pas deja existante 
export function getDatabase() {
    if (database) {
        
        return database;
    }

    database = new Database(DATABASE_PATH);
    //mettre des setting "pragma" ( recommander, par defaut)
    database.pragma("journal_mode = WAL");
    database.pragma("foreign_keys = ON");
    initializeTables(database);

    console.log("Database initaliser");

    return database;


}

//recuprer la db 
const sql = fs.readFileSync(database_init, "utf-8");

//initialiser la db
function initializeTables(database) {
    database.exec(sql);
}

export { database }




