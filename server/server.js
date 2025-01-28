import express from "express";
import mongoose from "mongoose";
const app = express()
const PORT = 8080;

 mongoose.connect("mongodb+srv://jjawadamn883:jjawadamn883@cluster0.uif7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

 .then (()=>(console.log("DB connected succesfully ")))
 .catch(()=>(console.log("Not connected som error from DB")))

 app.listen(PORT, ()=>(console.log("Server connected succesfully at ", PORT)))
