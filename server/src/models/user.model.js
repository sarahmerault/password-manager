// Fonctions d'accès à la table "users"
//
// Lit et écrit dans la table "users"
// Membre de la chaine donc il ne sait pas pourquoi il fait ça et re fait que répondre aux requêtes
// Sait : comment se connecter à la BDD via "getDatabase", quelles colonnes existent dans la table "users", comment écrire les requêtes SQL correspondantes
//
//
// On importe "getDatabase()" depuis init.js
// "getDatabase()" retourne toujours la même connexion avec le pattern "singleton"
// Evite d'ouvrir une nouvelle connexion à chaque appel de fonction
import { getDatabase } from '../database/init.js';

// Cherche un utilisateur par adresse email
// "email" (string non crypté) correspond à l'email cherché
// Return un objet user complet si correspondance trouvé, sinon undefined
export function findUserByEmail(email) {

    // On récupère la connexion à la BDD en appelant "getDatabase()"
    // Donc si BDD déjà ouverte alors retourne la connexion existante
    const database = getDatabase();

    // Construction & exécution de la requête avec ".prepare(...)" et ".get(email)"
    // ".prepare(...)" crée une requête. Le "?" est une sécurité que better-sqlite3 gère automatiquement et empêche une injection SQL
    // ".get(email)" éxécute en remplacant le "?" par la valeur de "email"
    // ".get()" retourne une ligne objet si correspondance, sinon undefined
    // ".all()" est non pertinent car le "user_email" est unique dans la table
    return database
        .prepare('SELECT * FROM users WHERE user_email = ?')
        .get(email)
}

// Insère un nouvel utilisateur dans la table "users"
// "email" (string) = adresse email du nouvel utilisateur
// "authHash" (string) = mot de passe crypté par bcrypt via controller
// "salt" (string) = sel cryptograpique généré coté client et utilisé pour dériver la clé de chiffrement
// Return un object { id, user_email } avec les infos du nouvel user
// "auth_hash" et "salt" ne sont pas retourné car données sensibles, sauf exception du "salt" lors des prochaines connexion
export function createUser(email, authHash, salt) {

    const database = getDatabase();

    // Exécution de ".prepare" avec ".run"
    // ".run" est la méthode pour les requêtes qui modifient la BDD : "INSERT" ajouter une ligne, "UPDATE" modifier une ligne, "DELETE" supprimer une ligne
    // Les "?" sont remplacer par nos 3 valeurs dans l'ordre (email, authHash, salt)
    // Les colonnes "created-at" et "updated-at" sont auto-update par init.sql avec "DEFAULT CURRENT-TIMESTAMP"
    // ".run()" return un objet avec 2 propriétés : "lastInsertRowid" (id auto généré par "AUTOINCREMENT") et "changes" (nombre de lignes modifiées, ici 1 seule)
    const result = database
        .prepare('INSERT INTO users (user_email, auth_hash, salt) VALUES (?, ?, ?)')
        .run(email, authHash, salt);

    // On construit et return un objet compréhensible simplement avec les informations non sensibles
    return {
        id: result.lastInsertRowid,
        user_email: email
    };
}