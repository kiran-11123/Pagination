import express from 'express'
import { GetCartController , getItems_Count_Controller} from '../controller/GetCartController.js';
import { Access_token_Middleware } from '../../../backend/app/middlewares/AccessToken_middleware.js';

const router = express.Router();


router.get('/get_cart_data' , Access_token_Middleware , GetCartController);
router.get('/get_cart_length' , Access_token_Middleware , getItems_Count_Controller )



export default router;