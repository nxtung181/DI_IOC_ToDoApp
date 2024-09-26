import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { TodoFactory } from "./todoFactory"
dotenv.config()

async function startServer() {
    try {
        const app = express()
        const Port = 5000
        app.use(express.json())

 
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('Connected');

        const userRoute = TodoFactory.createUserRoute()
        app.use('/api/user/', userRoute.router)

        const taskRoute = TodoFactory.createTaskRoute()
        app.use('/api/task/', taskRoute.router)
        
        app.listen(Port, () => {
            console.log(`Serve at http://localhost:${Port}`);
        });
    } catch (e) {
        console.log(e);
    }
}

startServer();