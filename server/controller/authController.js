import Joi from "joi";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
// Define password pattern for validation
const passwordPattern = /^[a-zA-Z0-9]{8,30}$/;

const authController = {
    async register(req , res ,next){
        // 1. Validate user input
        const passwordPattern = /^[a-zA-Z0-9]{8,30}$/; // Define passwordPattern (example pattern)

        const userRegisterSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            name: Joi.string().min(5).max(30).required(),
            email: Joi.string().email().required(), // Use Joi's email validation
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password'), // Use quotes for password reference
        }).with('password', 'confirmPassword'); // Ensure password and confirmPassword match
        
        const {error}= userRegisterSchema.validate(req.body)
        //2. If error is validation -> return error via middleware
        if(error){
            return next(error)
        }
        // If user or email already registered return the error
        const {username , name , email , password}= req.body;
        try {
            const emailinUse= await userModel.exists({email})
            const userInUser = await userModel.exists({username})
            if (emailinUse){
                const error={
                    status : 409,
                    message : "Email is already registered use another email"
                }
                return next(error)
            }
            if (userInUser){
                const error ={
                    status : 409,
                    message: ' User is already registered use another username '
                }
                return next(error)
            }
            
        } catch (error) {
            return next(error)
            
        }
        // 4. Password hashed
        const hashedPassword = await bcrypt.hash(password, 10)
        // 5. Store user data in database
        const userRegisterData= new userModel({
            // if key and name are same then we do not need to write both just can call 
            // not like that if the key and value are same name : name ,
            name ,
            username  ,
            email,
            password: hashedPassword
        });
        const user = await userRegisterData.save();
        // 6. response send 
        return res.status(201).json({user})




    },
    async login(){}
}
export default authController;