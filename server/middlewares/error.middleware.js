import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";



const errorHandler = (err, req, res, next) => {
    let error = err
    // Check if above error is instance of Custom error
    console.log(err)
    if(!(error instanceof ApiError)){
        // To maintain consistency, keep the same output format for errors
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500;
        const message = error.message || "Something went wrong"
        error = new ApiError(statusCode, message, error?.errors || [], err.stack)
    }  
    
    const response = {
        ...error,
        message : error.message,
        ...(process.env.NODE_ENV === "development" ? {stack : error.stack} : {})  // Error stack should be visible in dev mode for debugging    
    }

    return res.status(error.statusCode).json(response);
}


export {errorHandler};  