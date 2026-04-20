import { LogoutController } from "../../controller/Auth/LogoutController.js"
import { Access_token_Middleware } from "../../middlewares/AccessToken_middleware.js";

import express from 'express';
const Logout_Router = express.Router();
Logout_Router.post('/logout', Access_token_Middleware, LogoutController);



export default Logout_Router;