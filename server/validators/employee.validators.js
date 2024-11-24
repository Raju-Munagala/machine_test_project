import { body, param } from "express-validator";
import { courseCategories, designationRoles, genderCategories } from "../constants.js";



const addOrUpdateEmployeeValidator = () => {
    return [
        body('f_name')
        .trim()
        .notEmpty()
        .withMessage("Employee name is required"),
        body("f_email")
        .trim()
        .notEmpty()
        .withMessage("Employee email is required")
        .isEmail()
        .withMessage("Email provided is incorrect"),
        body("f_mobile")
        .trim()
        .notEmpty()
        .withMessage("Mobile Number should not be empty")
        .custom((value) => {
            const regex = /^\d{10}$/; 
            if(!regex.test(value)){
                throw new Error("Mobile number should be of 10 numeric digits");
            }   
            return true;
        }),
        body("f_designation")
        .trim()
        .notEmpty()
        .withMessage("Please select the Designation")
        .custom(value => {
            if(!Object.values(designationRoles).includes(value)){
                throw new Error("Designation is incorrect")
            }
            return true;
        }),
        body("f_gender")
        .trim()
        .notEmpty()
        .withMessage("Please select the Gender")
        .custom(value => {
            if(!Object.values(genderCategories).includes(value)){
                throw new Error("Gender selected is incorrect")
            }
            return true;
        }),
        body("f_course")
        .trim()
        .notEmpty()
        .withMessage("Please select the Course")
        .custom(value => {
            if(!Object.values(courseCategories).includes(value)){
                throw new Error("Course selected is incorrect")
            }
            return true;
        })
    ]
}



const deleteEmployeeValidator = () => {
    return [
        param('_id')
        .trim()
        .notEmpty()
        .withMessage("Please provide the ObjectId to be deleted")
        .isMongoId()
        .withMessage("Please provide the valid Object Id")
    ]
}

export {addOrUpdateEmployeeValidator, deleteEmployeeValidator}