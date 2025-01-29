import express from "express";
import dbConnect from './databaseConnections/index.js'
import config from './config/index.js';
import router from "./routes/index.js";
import errorHandler from "./middleware/erroHandler.js";
import cookieParser from "cookie-parser";
const { PORT } = config;
const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(router);

dbConnect()
 app.get('/',(req ,res)=>{res.json({msg : "Server are running "})})

 app.use(errorHandler)

 app.listen(PORT, ()=>(console.log("Server connected succesfully at ", PORT)))
