import Joi from "joi";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import UserDTO from "../dto/user.js";
import JWTservices from "../services/jwtservices.js";
import RefreshToken from '../models/token.js'
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
        let accessToken;
        let refreshToken;
        let user;
        try {
            const userRegisterData= new userModel({
                // if key and name are same then we do not need to write both just can call 
                // not like that if the key and value are same name : name ,
                name ,
                username  ,
                email,
                password: hashedPassword
            });
           const user = await userRegisterData.save();
            //token Generation
            accessToken= JWTservices.signAccessToken({_id : user._id },'30m')
            refreshToken= JWTservices.signRefreshToken({_id: user._id}, '60m')
            
        } catch (error) {
            return next(error)
            
        }
        //store refresh token in db
     await JWTservices.storeRefreshToken(refreshToken,user._id)
        //send token cookies
        res.cookie('accessToken', (accessToken),{
            maxAge: 1000*60*60*24,
            httpOnly:true
        })
        res.cookie('refreshToken', (refreshToken),{
            maxAge: 1000*60 * 60 *24,
            httpOnly:true
        })
        // 6. response send 
        const userDto = new UserDTO(user)
        return res.status(201).json({user: userDto, auth : true})




    },
    async login(req, res, next) {
        const loginRegesteration = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            password: Joi.string().pattern(passwordPattern).required()
        });
    
        const { error } = loginRegesteration.validate(req.body);
        if (error) {
            return next(error);
        }
    
        const { username, password } = req.body;
        let user;
        try {
            // Match user
            user = await userModel.findOne({ username: username });
            if (!user) {
                const error = {
                    status: 401,
                    message: 'Invalid user'
                };
                return next(error);
            }
    
            // Match password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                const error = {
                    status: 401,
                    message: 'Invalid password'
                };
                return next(error);
            }
        } catch (error) {
            return next(error);
        
        }
        
        const accessToken= JWTservices.signAccessToken({_id: user._id},'30m')
        const refreshToken = JWTservices.signRefreshToken({_id:user._id}, '60m')
        //update refresh token in database 
        try {
            await RefreshToken.updateOne({
                _id: user._id
            },
            {token : refreshToken},
            {upsert: true}
        )
            
        } catch (error) {
            return next(error)
            
        }
      
        res.cookie('accessToken', accessToken,{
            maxAge:1000* 60 * 60 *24,
            httpOnly:true
        })
        res.cookie('refreshToken', refreshToken,{
            maxAge: 1000* 60 * 60 *24 ,
            httpOnly: true
        })
        
        const userDTO = new UserDTO(user)
    
        return res.status(200).json({ user: userDTO, auth : true });
    },
     async logout(req , res, next){
        // delete refresh token from database
        const {refreshToken}= req.cookies
        try {
           await RefreshToken.deleteOne({token: refreshToken})
            
        } catch (error) {
            return next(error);
        }
        //delete cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken')
        //response 
        res.status(200).json({user: null, auth: false})

    }
  
    
}
export default authController;