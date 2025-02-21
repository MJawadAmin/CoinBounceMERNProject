// import Joi from "joi";
// import userModel from "../models/userModel.js";
// import bcrypt from 'bcryptjs'
// import UserDTO from "../dto/user.js";
// import JWTservices from "../services/jwtservices.js";
// import RefreshToken from '../models/token.js'
// import auth from "../middleware/auth.js";

// const passwordPattern = /^[a-zA-Z0-9]{8,30}$/;


// const authController = {

//     async register(req , res ,next){
//         // 1. Validate user input
//         const passwordPattern = /^[a-zA-Z0-9]{8,30}$/; // Define passwordPattern (example pattern)

//         const userRegisterSchema = Joi.object({
//             username: Joi.string().min(5).max(30).required(),
//             name: Joi.string().min(5).max(30).required(),
//             email: Joi.string().email().required(), // Use Joi's email validation
//             password: Joi.string().pattern(passwordPattern).required(),
//             confirmPassword: Joi.ref('password'), // Use quotes for password reference
//         }).with('password', 'confirmPassword'); // Ensure password and confirmPassword match
        
//         const {error}= userRegisterSchema.validate(req.body)
//         //2. If error is validation -> return error via middleware
//         if(error){
//             return next(error)
//         }
//         // If user or email already registered return the error
//         const {username , name , email , password}= req.body;
//         try {
//             const emailinUse= await userModel.exists({email})
//             const userInUser = await userModel.exists({username})
//             if (emailinUse){
//                 const error={
//                     status : 409,
//                     message : "Email is already registered use another email "
//                 }
//                 return next(error)
//             }
//             if (userInUser){
//                 const error ={
//                     status : 409,
//                     message: ' User is already registered use another username '
//                 }
//                 return next(error)
//             }
            
//         } catch (error) {
//             return next(error)
            
//         }
//         // 4. Password hashed
//         const hashedPassword = await bcrypt.hash(password, 10)
//         // 5. Store user data in database
//         let accessToken;
//         let refreshToken;
//         let user;
//         try {
//             const userRegisterData= new userModel({
//                 // if key and name are same then we do not need to write both just can call 
//                 // not like that if the key and value are same name : name ,
//                 name ,
//                 username  ,
//                 email,
//                 password: hashedPassword
//             });
//            const user = await userRegisterData.save();
//             //token Generation
//             accessToken= JWTservices.signAccessToken({_id : user._id },'30m')
//             refreshToken= JWTservices.signRefreshToken({_id: user._id}, '60m')
            
//         } catch (error) {
//             return next(error)
            
//         }
//         //store refresh token in db
//      await JWTservices.storeRefreshToken(refreshToken,user._id)
//         //send token cookies
//         res.cookie('accessToken', (accessToken),{
//             maxAge: 1000*60*60*24,
//             httpOnly:true
//         })
//         res.cookie('refreshToken', (refreshToken),{
//             maxAge: 1000*60 * 60 *24,
//             httpOnly:true
//         })
//         // 6. response send 
//         const userDto = new UserDTO(user)
//         return res.status(201).json({user: userDto, auth : true})




//     },
//     async login(req, res, next) {
//         const loginRegesteration = Joi.object({
//             username: Joi.string().min(5).max(30).required(),
//             password: Joi.string().pattern(passwordPattern).required()
//         });
    
//         const { error } = loginRegesteration.validate(req.body);
//         if (error) {
//             return next(error);
//         }
    
//         const { username, password } = req.body;
//         let user;
//         try {
//             // Match user
//             user = await userModel.findOne({ username: username });
//             if (!user) {
//                 const error = {
//                     status: 401,
//                     message: 'Invalid user'
//                 };
//                 return next(error);
//             }
    
//             // Match password
//             const match = await bcrypt.compare(password, user.password);
//             if (!match) {
//                 const error = {
//                     status: 401,
//                     message: 'Invalid password'
//                 };
//                 return next(error);
//             }
//         } catch (error) {
//             return next(error);
        
//         }
        
//         const accessToken= JWTservices.signAccessToken({_id: user._id},'30m')
//         const refreshToken = JWTservices.signRefreshToken({_id:user._id}, '60m')
//         //update refresh token in database 
//         try {
//             await RefreshToken.updateOne({
//                 _id: user._id
//             },
//             {token : refreshToken},
//             {upsert: true}
//         )
            
//         } catch (error) {
//             return next(error)
            
//         }
      
//         res.cookie('accessToken', accessToken,{
//             maxAge:1000* 60 * 60 *24,
//             httpOnly:true
//         })
//         res.cookie('refreshToken', refreshToken,{
//             maxAge: 1000* 60 * 60 *24 ,
//             httpOnly: true
//         })
        
//         const userDTO = new UserDTO(user)
    
//         return res.status(200).json({ user: userDTO, auth : true });
//     },
//      async logout(req , res, next){
      
//         // delete refresh token from database
//         const {refreshToken}= req.cookies
//         try {
//            await RefreshToken.deleteOne({token: refreshToken})
            
//         } catch (error) {
//             return next(error);
//         }
//         //delete cookies
//         res.clearCookie('accessToken');
//         res.clearCookie('refreshToken')
//         //response 
//         res.status(200).json({user: null, auth: false})

//     },
  
//     async refresh(req, res, next) {
//         const originalRefreshToken = req.cookies.refreshToken;  // Ensure correct cookie name
//         let id;
    
//         try {
//             id = JWTservices.verifyRefreshToken(originalRefreshToken)._id;
//         } catch (err) {
//             const error = {
//                 status: 401,
//                 message: 'Unauthorized'
//             };
//             return next(error);
//         }
    
//         try {
//             // Check for the refresh token in the database
//             const match = await RefreshToken.findOne({ _id: id, token: originalRefreshToken });  // Ensure '_id' is used for MongoDB query
//             if (!match) {
//                 const error = {
//                     status: 401,
//                     message: 'Unauthorized'
//                 };
//                 return next(error);
//             }
//         } catch (error) {
//             return next(error);
//         }
    
//         try {
//             // Generate new access and refresh tokens
//             const accessToken = JWTservices.signAccessToken({ _id: id }, '30m');
//             const refreshToken = JWTservices.signRefreshToken({ _id: id }, '60m');
            
//             // Update refresh token in the database
//             await RefreshToken.updateOne({ _id: id }, { token: refreshToken });  // Ensure '_id' is used
    
//             // Set new tokens in cookies
//             res.cookie('accessToken', accessToken, {
//                 maxAge: 1000 * 60 * 60 * 24,
//                 httpOnly: true
//             });
    
//             res.cookie('refreshToken', refreshToken, {
//                 maxAge: 1000 * 60 * 60 * 24,
//                 httpOnly: true
//             });
//         } catch (error) {
//             return next(error);
//         }
    
//         // Fetch user data and send the response
//         const user = await userModel.findOne({ _id: id });  // Ensure '_id' is used
//         const userDto = new UserDTO(user);
    
//         return res.status(200).json({ user: userDto, auth: true });
//     }
    
  
    
// }
// export default authController;






import Joi from "joi";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import UserDTO from "../dto/user.js";
import JWTservices from "../services/jwtservices.js";
import RefreshToken from '../models/token.js';

const passwordPattern = /^[a-zA-Z0-9]{8,30}$/;

const authController = {
    async register(req, res, next) {
        // 1. Validate user input
        const userRegisterSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            name: Joi.string().min(5).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password'),
        }).with('password', 'confirmPassword');

        const { error } = userRegisterSchema.validate(req.body);
        if (error) return next(error);

        const { username, name, email, password } = req.body;

        try {
            const emailInUse = await userModel.exists({ email });
            const userInUse = await userModel.exists({ username });

            if (emailInUse) return next({ status: 409, message: "Email is already registered." });
            if (userInUse) return next({ status: 409, message: "Username is already taken." });

            // 2. Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // 3. Save user to DB
            const user = await new userModel({ name, username, email, password: hashedPassword }).save();

            // 4. Generate tokens
            const accessToken = JWTservices.signAccessToken({ _id: user._id }, '30m');
            const refreshToken = JWTservices.signRefreshToken({ _id: user._id }, '60m');

            // 5. Store refresh token
            await new RefreshToken({ _id: user._id, token: refreshToken }).save();

            // 6. Set cookies
            res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
            res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

            // 7. Send response
            return res.status(201).json({ user: new UserDTO(user), auth: true });

        } catch (error) {
            return next(error);
        }
    },

    async login(req, res, next) {
        const loginSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            password: Joi.string().pattern(passwordPattern).required(),
        });

        const { error } = loginSchema.validate(req.body);
        if (error) return next(error);

        const { username, password } = req.body;

        try {
            const user = await userModel.findOne({ username });
            if (!user) return next({ status: 401, message: 'Invalid username or password.' });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return next({ status: 401, message: 'Invalid username or password.' });

            const accessToken = JWTservices.signAccessToken({ _id: user._id }, '30m');
            const refreshToken = JWTservices.signRefreshToken({ _id: user._id }, '60m');

            // Update refresh token in DB
            await RefreshToken.updateOne(
                { _id: user._id },
                { token: refreshToken },
                { upsert: true }
            );

            // Set cookies
            res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
            res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

            return res.status(200).json({ user: new UserDTO(user), auth: true });

        } catch (error) {
            return next(error);
        }
    },

    async logout(req, res, next) {
        const { refreshToken } = req.cookies;
        try {
            await RefreshToken.deleteOne({ token: refreshToken });
        } catch (error) {
            return next(error);
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return res.status(200).json({ user: null, auth: false });
    },

    async refresh(req, res, next) {
        const originalRefreshToken = req.cookies.refreshToken;
        if (!originalRefreshToken) return next({ status: 401, message: "Unauthorized" });

        let id;
        try {
            id = JWTservices.verifyRefreshToken(originalRefreshToken)._id;
        } catch (err) {
            return next({ status: 401, message: "Unauthorized" });
        }

        try {
            const match = await RefreshToken.findOne({ _id: id, token: originalRefreshToken });
            if (!match) return next({ status: 401, message: "Unauthorized" });

            const accessToken = JWTservices.signAccessToken({ _id: id }, '30m');
            const refreshToken = JWTservices.signRefreshToken({ _id: id }, '60m');

            await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

            res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
            res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

            const user = await userModel.findById(id);
            return res.status(200).json({ user: new UserDTO(user), auth: true });

        } catch (error) {
            return next(error);
        }
    }
};

export default authController;
