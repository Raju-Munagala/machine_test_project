class ApiError extends Error{
    
    /**
    //
    * @param {number} statusCode
    * @param {string} message
    * @param {any[]} errors
    * @param {string} stack
    */
 
    constructor(
     statusCode,
     message = "Something went wrong",
     errors = [],
     stack = ""
    ){
         super();
         this.statusCode = statusCode;
         this.message = message;
         this.errors = errors;
         this.data = null;
         this.success = false;
         this.stack = stack ? stack : Error.captureStackTrace(this, this.constructor);
    }
 
 }
 
 
 export  { ApiError }