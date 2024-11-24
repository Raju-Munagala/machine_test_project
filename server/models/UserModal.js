import mongoose, { Schema } from "mongoose";



const t_loginSchema = new Schema({
    f_sno : {
        type : Number,
        required : true
    },
    f_userName : {
        type : String,
        required : true
    },
    f_pwd : {
        type : String,
        required : true
    }
}, {timestamps : true});


export const t_login = mongoose.model('t_login', t_loginSchema);