import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app =express();
app.use(express.json());
const PORT = process.env.PORT;
import DataRouter from './app/routes/DataRouter.js';






app.use("/products" , DataRouter)



app.listen(PORT  , ()=>{
     console.log(`Server is running on the port ${PORT}`)
})







