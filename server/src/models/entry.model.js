// Fonctions d'accès à la table "entries"
//
// Gère le CRUD de la table "entries"
// Create = "createEntry()"
// Read = "findEntriesByUserId()", "findEntryByIdAndUserId()"
// Update = "updateEntry()"
// Delete = "deleteEntry()"
//
// Protection IDOR Insecure Direct Object Reference
// Protection qui consiste en "AND user_di = ?" dans les requêtes SQL pour cibler l'entry à l'user actif et empecher qu'un user puisse lui même spécifier l'id et lire/modifier/supprimer les données d'une autre personne en devinant son id
//
//
// Voir commentaire dans user.model.js sur l'import de "getDatabase"
import { getDatabase } from "../database/init";

// Récupère toutes les entrées de l'utilisateur
// userId (number) = id de l'user connecté
// Return un tableau d'objet "entry", si aucune entrée alors retourne : "[]"
// On cherche à retourner tous les résultats donc on utilise ".all()" au lieu de ".get()"
// "ORDER BY created_at DESC" = les entries les plus récentes en premier
// Le frontend affichera les derniers mots de passe ajoutés
export function findEntriesByUserId(userID) {
    const database = getDatabase();

    // ".all(userId)" remplace le "?" par la valeur de userId
    // Return un tableau avec les lignes correspondantes
    // Si aucune entry correspondant au user alors retour un tableau vide "[]"
    return database
        .prepare('SELECT * FROM entries WHERE user_id = ? ORDER BY created_at DESC')
        .all(userId)
}

// Récupère 1 entry spécifique avec vérification de correspondance id
// "entryId" (number) = id de l'entry recherchée
// "userId" (number) = id du user connecté
// Return object "entry" si trouvé et si propriétaire, sinon "undefined"
//
// Protection IDOR :
// "WHERE id = ? AND user_id = ?"
// Si "userId" = "2" demande entry#1 qui appartient à "userId" = 2 alors return "undefined"
//
// Fonction réutilisée par "createEntry()" et "updateEntry()"
export function findEntryByIdAndUserId(entryId, userId) {
    const database = getDatabase();

    // .get() return un seul object, si rien alros "undefined"
    // Les valeurs "entryId" et "userId" remplacent les 2 "?" dans l'ordre
    return database
        .prepare('SELECT * FROM entries WHERE id = ? AND user_id = ?')
        .get(entryId, userId);
}

// Insère une nouvelle entrée dans la table "entries"
// "userId" (number) = id user propriétaire (vient du JsonWebToken)
// "username" (string | null) = nom utilisateur sur le service
// "email" (string | null) = mail utilisé sur le service
// "serviceName" (string) = nom du service
// "encryptedData" (string) = mot de passe chiffré coté client
// "iv" (string) = vecteur d'initialisation du chiffrement
// Return l'entry complète avec toutes les colonnes, dont "created-at" rempli automatiquement par SQlite
// "username" & "email" peuvent revenir "null"
export function createEntry(userId, username, email, serviceName, encryptedData, iv) {
    const database = getDatabase();

    // "INSERT" 6 colonnes avec 6 "?"
    // L'ordre des "?" correspond à l'ordre des colonnes
    // Les colonnes "id", "created_at", "updated_at" se remplissent toutes seules grâce à "AUTOINCREMENT" et "DEFAULT CURRENT_TIMESTAMP"
    const result = database
        .prepare('INSERT INTO entries (user_id, username, email, service_name, encrypted_data, iv) VALUES (?, ?, ?, ?, ?, ?,)')
        .run(userId, username, email, serviceName, encryptedData, iv);

        // Appeler "findEntryByIdAndUserId()" permet de retourner l'entry complète avec "created_at" et "updated_at"
        // "result.lastInsertRowid" = id que SQLite vient attribuer à l'entry
        return findEntryByIdAndUserId(result.lastInsertRowid, userId);
}

// Modifie une entry existante
// "entryId" (number) = id de l'entry à modifier
// "userId" (number) = id du user propriétaire (protection IDOR)
// "username" (string | null) = nouvelle valeur
// "email" (string | null) = nouvelle valeur
// "serviceName" (string) = nouvelle valeur
// "encryptedData" (string) = nouvelle valeur
// "iv" (string) = nouvelle valeur
// Return entry mise à jour, si n'existe pas ou n'appartient pas à cet user (IDOR bloqué) alors return "undefined"
export function updateEntry(entryId, userId, username, email, serviceName, encrypted_data, iv) {
    const database = getDatabase();

    // "UPDATE" avec "SET" pour chaque colonne modifiable
    // Sur SQLite les colonnes "DEFAULT" doivent être mis à jour manuellement lors d'un "UPDATE"
    // Le "DEFAULT" ne s'applique qu'à l"INSERT" initial
  const result = database
    .prepare(
      'UPDATE entries SET username = ?, email = ?, service_name = ?, encrypted_data = ?, iv = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?'
    )
    .run(username, email, serviceName, encryptedData, iv, entryId, userId);

    // Indique le nombre de lignes modifiées, sinon return "undefined"
    // A lier au controller pour return une "404 Error" au client
    if (result.changes === 0) {
        return undefined;
    }

    // On appelle "findEntryByIdAndUserId()" pour relire l'entry après modification
    // Réalise un "SELECT" qui permet de retourner les données à jour dont le "updated_at"
    return findEntryByIdAndUserId(entryId, userId);
}

// Supprime une entry de la table
// "entryId" (number) = id de l'entry à supprimer
// "userId" (number) = id du user (protection IDOR)
// Return nombre de lignes supprimées
// "1" = suppression réussie
// "0" = l'entry n'existe pas ou n'appartient pas au user
// Le controller utilisera cette valeur pour décider du code HTTP
// "1" = réponse 204 "No Content" = "bien supprimé, rien à retourner"
// "0" = réponse 404 "Not Found" = "entry introuvable"
export function deleteEntry(entryId, userId) {
    const database = getDatabase();

    // "DELETE" avec la double condition id + user_id (protection IDOR)
    const result = database
        .prepare('DELETE FROM entries WHERE id = ? AND user_id = ?')
        .run(entryId, userId);

    // On veut return "result.changes" pour le controller
    return result.changes;
}