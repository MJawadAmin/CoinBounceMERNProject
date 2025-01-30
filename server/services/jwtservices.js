import config from '../config/index.js';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = config;

import jwt from 'jsonwebtoken' 
import refreshtokenModel from '../models/token.js'




class JWTservices{
    //sign access token
   static signAccessToken(payload, expiryTime ){
        return jwt.sign(payload, ACCESS_TOKEN_SECRET , {expiresIn: expiryTime});
    }
   

    //sign refresh tokenxpiryTime
    static signRefreshToken(payload , expiryTime){
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: expiryTime})
    }

    //verify access token 
    static verifyAccesToken(token){
        return jwt.verify(token ,ACCESS_TOKEN_SECRET)
    }

    //verify refresh token 
    static verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_TOKEN_SECRET)
    }

    //store refresh token 
    static async storeRefreshToken(token , userId ){
        try {
            const newToken= new refreshtokenModel({
                token : token ,
                userId : userId
            });
            //store in DB
            await newToken.save()

            
        } catch (error) {
            return next(error)
        }
    }
}
export default JWTservices;