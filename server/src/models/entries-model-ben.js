// import bdd
import { getDatabase } from "../database/init.js";

const database = getDatabase();

// sql create entry
export const createEntry_model = async (
  user_id,
  username,
  email,
  service_name,
  iv,
) => {
  const result = database
    .prepare(
      "INSERT INTO entries (user_id, username, email, service_name, encrypted_data) VALUES (?,?,?,?,?,?)",
    )
    .run(user_id, username, email, service_name, iv);
  return {
    id: result.lastInsertRowid,
    service: service_name,
    username: username,
  };
};

// sql read all entries by mail
export const getEntriesByMail_model = async (email) => {
  return database.prepare("SELECT * FROM entries WHERE email = ?").get(email);
};

// sql read single entry
export const getEntryById_model = async (id) => {
  return database.prepare("SELECT * FROM entries WHERE id = ?").get(id);
};

// sql delete single entry
export const deleteEntryById_model = async (id) => {
  const result = database.prepare("DELETE FROM entries WHERE id = ?").run(id);
  return {
    message: "entry deleted",
  };
};
