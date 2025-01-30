import JWTservices from "../services/jwtservices.js";
import UserDTO from "../dto/user.js";
import userModel from "../models/userModel.js";
const auth = async (req , res , next)=>{

try {
        // refresh , access , token validation
        const {refreshToken , accessToken}=req.cookies;
        if (!refreshToken || !accessToken){
            const error = {
                status : 401 ,
                message : ' unauthorized'
        
            }
            return next(error)
        }
        let _id;
        try {
            _id = JWTservices.verifyAccesToken(accessToken)
        } catch (error) {
            return next(error)   
        }
        let user;
        try {
            user= await userModel.findOne({_id : _id})
        } catch (error) {
            return next(error)    
        }
        const userDto = new UserDTO(user)
        req.user= userDto;
        next()
        }catch (error) {
            return next(error)
} 
    
}
export default auth;