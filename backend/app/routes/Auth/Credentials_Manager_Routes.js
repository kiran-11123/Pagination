import express from 'express'
import { ForgotPasswordController } from '../../controller/Auth/Credentails_Manager.js';
import { Access_token_Middleware } from '../../middlewares/AccessToken_middleware';
const Credentails_Router = express.Router();


Credentails_Router.post("/forgot-password" , Access_token_Middleware , ForgotPasswordController);







export default Credentails_Router