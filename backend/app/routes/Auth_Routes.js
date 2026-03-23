import { SignUpController, SigninContoller  , DeleteUserController} from "../controller/AuthControllers";
import { AuthMiddleware } from "../middlewares/Auth_middleware";

const Auth_Router  = express.Router();

Auth_Router.post("/signup", SignUpController);
Auth_Router.post("/signin", SigninContoller);
Auth_Router.post("/delete" ,AuthMiddleware ,  DeleteUserController);


export default Auth_Router;