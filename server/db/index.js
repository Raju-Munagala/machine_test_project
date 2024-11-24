import mongoose from "mongoose";

const DB_NAME = 'employee_db'


let  dbInstance = undefined;
const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        dbInstance = connectionInstance;
        console.log(`MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};

export default connectDB;