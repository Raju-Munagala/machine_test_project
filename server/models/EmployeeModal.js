import mongoose, { Schema } from "mongoose";
import { courseCategories, designationRoles, designationRolesEnum, genderCategories } from "../constants.js";


const t_EmployeeSchema = new Schema({
    f_id :{
        type : Number,
        required : true
    },
    f_image :{
        type : String,
        default : ''
    },
    f_name : {
        type : String,
        required : true
    },
    f_email : {
        type : String,
        required : true
    },
    f_mobile : {
        type : Number,
    },
    f_designation : {
       type : String,
       enum : designationRoles,
       required : true
    },
    f_gender : {
        type : String,
        enum : genderCategories,
        required : true
    },
    f_course : {
        type : String,
        enum : courseCategories,
        required : true
    }
}, {timestamps : true});



export const t_employee = mongoose.model('t_employee', t_EmployeeSchema);

