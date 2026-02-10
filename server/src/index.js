import express from 'express'
import 'dotenv/config'
import cors from 'cors'

 

const index = express();
index.use(express.json())
index.use(cors({
    origin:'http://localhost:5173'
}))







const PORT = process.env.PORT || 5000;

index.listen(PORT, () => {
    console.log(`http://localhost:${PORT} `);
});

