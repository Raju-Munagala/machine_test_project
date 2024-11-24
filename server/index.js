import {  httpServer } from "./app.js";
import connectDB from "./db/index.js";
import { configDotenv } from 'dotenv';

configDotenv();


const startServer = async () => {
    try {
        await connectDB();
        httpServer.listen(process.env.PORT || 8080, () => {
            console.log(`Server is running on port : ${process.env.PORT || 8080}`)
        })
    } catch (error) {
        console.log(err);
    }   
}


startServer();