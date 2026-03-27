import express from 'express'
import { ForgotPasswordController  , ResetPassword , ChangePassword} from '../../controller/Auth/Credentails_Manager.js';
import { Access_token_Middleware } from '../../middlewares/AccessToken_middleware';
const Credentails_Router = express.Router();


Credentails_Router.post("/forgot-password" , Access_token_Middleware , ForgotPasswordController);
Credentails_Router.post("/reset-password" , Access_token_Middleware , ResetPassword);
Credentails_Router.post("/change-password" , Access_token_Middleware , ChangePassword);






export default Credentails_Router