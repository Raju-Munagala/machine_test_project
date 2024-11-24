import { t_login } from "../models/UserModal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getNextId } from "../utils/nextIdValue.js";


const registerUser = asyncHandler(async (req, res) => {
    const {f_userName, f_pwd} = req.body;
    const existingUser = await t_login.findOne({
        f_userName
    });

    if(existingUser){
        throw new ApiError(409, "User already exists",[]);
    };
    const nextId = await getNextId('login');
    const user = await t_login.create({
        f_sno : nextId,
        f_userName,
        f_pwd,
    });
    
    await user.save({validateBeforeSave : true});

    // Just to make sure user is created
    const createdUser = await t_login.findById(user._id).select(
        "-f_pwd"
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user");
    }
    return res.status(201).json(new ApiResponse(201, createdUser, "User Registered successfully"));
});




const loginUser = asyncHandler(async (req, res) => {
    const {f_userName, f_pwd} = req.body;

    const existingUser = await t_login.findOne({
        f_userName 
    });

    if(!existingUser){
        throw new ApiError(404, "User not found", []);
    }
    if(existingUser.f_pwd !== f_pwd){
        throw new ApiError(404, "User Name or Password is incorrect");
    };
    const userObj = existingUser.toObject();
     // dont send password through API response
    delete userObj.f_pwd

    return res.status(200).json(new ApiResponse(200, userObj, "User found with given details"));
});


export {registerUser, loginUser}