import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
const app = express();
app.use(cors());
import router from './app/routes/GetDataRoutes.js';
const PORT = process.env.PORT || 5003;



app.use("/get-cart" , router);


app.listen(PORT , ()=>{
      console.log(`Server is running on Port ${PORT}`)
})

