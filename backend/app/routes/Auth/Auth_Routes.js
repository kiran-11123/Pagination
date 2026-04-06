import { SignUpController, SigninContoller  , DeleteUserController } from "../../controller/Auth/AuthControllers.js";
import { Access_token_Middleware } from "../../middlewares/AccessToken_middleware.js";
import { LogoutController } from "../../controller/Auth/LogoutController.js";

import express from 'express'
const Auth_Router  = express.Router();

Auth_Router.post("/signup", SignUpController);
Auth_Router.post("/signin", SigninContoller);
Auth_Router.post("/delete" ,Access_token_Middleware ,  DeleteUserController);
Auth_Router.post("/logout" , Access_token_Middleware , LogoutController);


export default Auth_Router;