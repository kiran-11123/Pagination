import { SignUpController, SigninContoller } from "../controller/AuthControllers";


const Auth_Router  = express.Router();

Auth_Router.post("/signup", SignUpController);
Auth_Router.post("/signin", SigninContoller);



export default Auth_Router;