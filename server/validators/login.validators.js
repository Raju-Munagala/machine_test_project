import { body } from "express-validator";

// The below function returns validation chain.. i.e is there are any errors, it throws the errors in array
const validateRegisterOrLogin = () => {
    return [
        body("f_userName")
        .trim()
        .notEmpty()
        .withMessage("User Name should not be empty"),
        body("f_pwd")
        .trim()
        .notEmpty()
        .withMessage("Password should not be empty")
    ]
};



export {validateRegisterOrLogin}



