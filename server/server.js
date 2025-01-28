import express from "express";
import dbConnect from './databaseConnections/index.js'
import config from './config/index.js';
const { PORT } = config;
const app = express()

dbConnect()

 app.get('/',(req ,res)=>{res.json({msg : "Server are running "})})

 app.listen(PORT, ()=>(console.log("Server connected succesfully at ", PORT)))
