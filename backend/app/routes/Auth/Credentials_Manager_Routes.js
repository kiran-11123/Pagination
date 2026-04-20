import express from 'express'
import { ForgotPasswordController  , ResetPassword , ChangePassword} from '../../controller/Auth/Credentails_Manager.js';
import { Access_token_Middleware } from '../../middlewares/AccessToken_middleware.js';
const Credentails_Router = express.Router();


Credentails_Router.post("/forgot-password"  , ForgotPasswordController);
Credentails_Router.post("/reset-password"  , ResetPassword);
Credentails_Router.post("/change-password"  , ChangePassword);






export default Credentails_Router