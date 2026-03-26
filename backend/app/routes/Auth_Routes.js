import { SignUpController, SigninContoller  , DeleteUserController} from "../controller/AuthControllers.js";
import { AuthMiddleware } from "../middlewares/AccessToken_middleware.js";

import express from 'express'
const Auth_Router  = express.Router();

Auth_Router.post("/signup", SignUpController);
Auth_Router.post("/signin", SigninContoller);
Auth_Router.post("/delete" ,AuthMiddleware ,  DeleteUserController);


export default Auth_Router;