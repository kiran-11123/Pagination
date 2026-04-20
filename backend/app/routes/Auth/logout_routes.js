import { LogoutController } from "../../controller/Auth/LogoutController.js"

import express from 'express';
const Logout_Router = express.Router();
Logout_Router.post('/logout', LogoutController);



export default Logout_Router;