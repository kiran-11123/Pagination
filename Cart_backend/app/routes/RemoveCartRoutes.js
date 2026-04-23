// Route file for removing items from cart

import express from 'express'
const Remove_Cart_Router = express.Router();
import { Access_token_Middleware } from '../../../backend/app/middlewares/AccessToken_middleware.js';

import { RemoveCartController } from '../controller/RemoveCartController.js';


Remove_Cart_Router.delete('/remove_cart_item' , Access_token_Middleware, RemoveCartController);











export default Remove_Cart_Router;