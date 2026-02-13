// import db, models, env
import "dotenv/config";
import {
  createEntry_model,
  getEntriesByMail_model,
  getEntryById_model,
  deleteEntryById_model,
} from "../models/entries-model-ben.js";

// create entry
export const createEntry_controller = async (req, res) => {
  try {
    const { user_id, username, email, service_name, password } = req.body;

    // cryptage du mdp avec crypto.js -> encrypt()

    await createEntry_model(
      user_id,
      username,
      email,
      service_name,
      encrypted_data,
    );

    return res.status(201).json({ message: "entrée créer" });
  } catch (err) {
    res.status(500).json({ message: "erreur serveur", error: err.message });
  }
};

// display decrypted entry

// update entry

// delete entry
