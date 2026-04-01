import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());





app.listen(PORT, () => {
    console.log(`Transaction service is running on port ${PORT}`);
});