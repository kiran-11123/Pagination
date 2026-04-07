import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5003;






app.listen(PORT , ()=>{
      console.log(`Server is running on Port ${PORT}`)
})

