// Used to handle each request handler, If any error occurs, It uses error-handling middle ware to throw errors instead of just try and catch
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(err => next(err));
    };
};

export {asyncHandler}