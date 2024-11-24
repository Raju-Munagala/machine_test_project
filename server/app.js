import express from "express"
import { createServer } from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { errorHandler } from "./middlewares/error.middleware.js";
import loginRouter from "./routes/login_route.js"
import employeeRouter from "./routes/employee_route.js";
import fs from 'fs';
import { uploadSingleImage } from "./utils/fileHandler.js";
import multer from "multer";
import path from 'path'
import { configDotenv } from "dotenv";


configDotenv();
const app = express();

const httpServer = new createServer(app);

if(!fs.existsSync('uploads')){
  fs.mkdirSync('uploads')
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage: storage });
console.log(process.env.CORS_ORIGIN);
app.use(
    
    cors({
      origin: process.env.CORS_ORIGIN, 
      credentials: true
    })
  );

  
app.use(express.json({ limit: "1Mb" }));
app.use(express.urlencoded({ extended: true, limit: "1Mb" }));
app.use(cookieParser());
app.options('*', cors());
// Routes to be added

// For hosting images for frontned  ->eg : http://localhost:8080/uploads/image-1732258650120.png





app.use('/user', loginRouter);


// The below is middileware is for handling images uploaded by user
// app.use();

app.use('/uploads', express.static('uploads'))



app.use('/employee',  employeeRouter);


app.use(errorHandler)

export {httpServer}