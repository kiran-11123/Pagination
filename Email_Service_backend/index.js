import dotenv from 'dotenv';
import express from 'express'
const app = express();
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 5003;








app.listen(port , ()=>{
       
     console.log(`Email Service Running on PORT : ${port}`);
})




