import { Router } from "express";
import { validateRegisterOrLogin } from "../validators/login.validators.js";
import { validate } from "../validators/validate.js";
import { loginUser, registerUser } from "../service/loginService.js";





const router = Router();

router.route('/register-user').post(validateRegisterOrLogin(), validate, registerUser);
router.route('/login-user').post(validateRegisterOrLogin(), validate, loginUser);


export default router