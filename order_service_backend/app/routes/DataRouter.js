import express from 'express'
import { GetDataController } from '../controller/DataController.js';
import { Access_token_Middleware } from '../../../backend/app/middlewares/AccessToken_middleware.js';
const DataRouter = express.Router();



DataRouter.get("/get-products" ,GetDataController)

    


export default DataRouter