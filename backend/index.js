import express from 'express'
import cors from 'cors'
import Page_Router from './routes/Pagnataion.js';
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1" , Page_Router)











app.listen(5000,()=>{
    console.log("Server is Running")
})