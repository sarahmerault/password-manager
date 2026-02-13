// Import bdd
import { getDatabase } from "../database/init.js";

const database = getDatabase();

// sql create user
export const createUser_model = (email, auth_hash, salt) => {
  const result = database
    .prepare("INSERT INTO users (user_email, auth_hash, salt) VALUES (?,?,?)")
    .run(email, auth_hash, salt); // Changer le salt
  return {
    id: result.lastInsertRowid,
    user_email: email,
  };
};

// sql mail verifier
export const findUserByEmail_model = (email) => {
  return database
    .prepare("SELECT * FROM users WHERE user_email = ?")
    .get(email);
};

// sql delete user
export const deleteUser_model = async (id) => {
  const result = database
    .prepare("DELETE FROM users WHERE id = ? VALUES (?)")
    .run(id);
  return {
    message: "User deleted",
  };
};

// Exemple de requete SQLite
// export function findUserByEmail(email) {

//     // On récupère la connexion à la BDD en appelant "getDatabase()"
//     // Donc si BDD déjà ouverte alors retourne la connexion existante
//     const database = getDatabase();

//     // Construction & exécution de la requête avec ".prepare(...)" et ".get(email)"
//     // ".prepare(...)" crée une requête. Le "?" est une sécurité que better-sqlite3 gère automatiquement et empêche une injection SQL
//     // ".get(email)" éxécute en remplacant le "?" par la valeur de "email"
//     // ".get()" retourne une ligne objet si correspondance, sinon undefined
//     // ".all()" est non pertinent car le "user_email" est unique dans la table
//     return database
//         .prepare('SELECT * FROM users WHERE user_email = ?')
//         .get(email)
// }
