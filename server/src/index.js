import express from "express";
import "dotenv/config";
import cors from "cors";
import { getDatabase } from "./database/init.js";
import router from "./routes/user-routes-ben.js";

const index = express();
index.use(express.json());
index.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

getDatabase();

const PORT = process.env.PORT || 5000;

index.use('/db/user', router)

index.listen(PORT, () => {
  console.log(`http://localhost:${PORT} `);
});
