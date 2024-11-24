import mongoose, {Schema} from "mongoose";


// This is just to assign new f_id to each User
// assigns new Id to each user that registers
const loginCounterSchema = new Schema({
    _id : {
        type : String,
        required : true
    },
    sequence_value : {
        type : Number,
        default : 1
    }
});


// Assigns new Id to each employee that gets added to employee table
const employeeCounterSchema = new Schema({
    _id : {
        type : String,
        required : true
    },
    sequence_value : {
        type : Number,
        default : 1
    }
});



const loginCounter = mongoose.model("loginCounter", loginCounterSchema);
const employeeCounter = mongoose.model("employeeCounter", employeeCounterSchema);

export {loginCounter, employeeCounter}