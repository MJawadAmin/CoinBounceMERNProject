import express from "express";
import dbConnect from './databaseConnections/index.js'
import config from './config/index.js';
import router from "./routes/index.js";
import errorHandler from "./middleware/erroHandler.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const corsOption={
    credentials:true,
    origin:["http://localhost:5173"],
};
const { PORT } = config;
const app = express()
app.use(cookieParser())
app.use(cors(corsOption))
app.use(express.json());
app.use(router);

dbConnect()

app.use('/storage', express.static('storage')); // Serve static files from the 'storage' directory

 app.use(errorHandler)

 app.listen(PORT, ()=>(console.log("Server connected succesfully at ", PORT)))
