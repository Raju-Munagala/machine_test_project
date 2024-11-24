import { Router } from "express";
import { addOrUpdateEmployeeValidator, deleteEmployeeValidator } from "../validators/employee.validators.js";
import { validate } from "../validators/validate.js";
import { addEmployee, deleteEmployee, editEmployee, getEmployeesList, searchEmployees } from "../service/EmployeeService.js";
import { uploadSingleImage } from "../utils/fileHandler.js";


const router = Router();


router.route('/add-employee').post(addOrUpdateEmployeeValidator() , validate, addEmployee);

router.route('/edit-employee').post(addOrUpdateEmployeeValidator(),  validate,editEmployee);

router.route('/all-employees').post(getEmployeesList);


router.route('/search-employees').post(searchEmployees);


router.route('/delete-employee/:_id').delete(deleteEmployeeValidator(), validate, deleteEmployee)


router.route('/upload-image').post(uploadSingleImage);


export default router;