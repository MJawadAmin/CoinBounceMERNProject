import mongoose from "mongoose";
import config from '../config/index.js';  // Default import
const MONGO_DB = config.MONGO_DB;



// mongoose.connect(MONGO_DB)
// .then (()=>(console.log("DB connected succesfully ")))
// .catch(()=>(console.log("Not connected som error from DB")))
const dbConnect= async ()=>{
    try {
        const conn = await mongoose.connect(MONGO_DB)
        console.log(`DataBase connected Succesfully to host :${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Error : ${error}`)
        
    }
}
export default dbConnect;

{/*Chat gpt help */}
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables

// const dbConnect = async () => {
//   const MONGO_DB = process.env.MONGO_URL;

//   if (!MONGO_DB) {
//     throw new Error("MONGO_URL is not defined in the environment variables.");
//   }

//   try {
//     await mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Failed to connect to the database:", error);
//     process.exit(1); // Exit process if the connection fails
//   }
// };

// export default dbConnect;
