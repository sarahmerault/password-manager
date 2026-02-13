// import db, models, env
import "dotenv/config";
import {
  createUser_model,
  findUserByEmail_model,
  deleteUser_model,
} from "../models/user-model-ben.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register controller
export const register_controller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await findUserByEmail_model(email);
    if (existing) {
      return res.status(409).json({ message: "email déja utilisé" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await createUser_model(email, passwordHash, salt);

    return res.status(201).json({ message: "Compte créer avec succès" });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur", error: error.message });
  }
};

// login controller
export const login_controller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail_model(email);
    if (!user) {
      return res.status(400).json({ message: "email ou mdp invalide" });
    }

    const valid = await bcrypt.compare(
      password,
      user.auth_hash,
      (err, results) => {
        if (!results) {
          return res
            .status(400)
            .json({ message: "email ou mot de passe incorrects" });
        }

        const token = jwt.sign({ name: email }, "secret_key", {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Token créé", token: token });
      },
    );
  } catch (error) {
    res.status(500).json({ message: "Aucun utilisateur ou email" });
  }
};

// delete user controller ?
