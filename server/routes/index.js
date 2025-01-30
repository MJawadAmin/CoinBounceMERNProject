import express from "express";
import authController from "../controller/authController.js";
import auth from '../middleware/auth.js'
const router = express.Router()
//user 

//register
router.post ('/register', authController.register)
//login 
router.post ('/login', authController.login) 
//logout
router.post('/logout',auth, authController.logout)


//refresh

//blog


export default router;