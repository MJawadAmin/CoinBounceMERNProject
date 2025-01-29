import express from "express";
import authController from "../controller/authController.js";
const router = express.Router()
//user 

//register
router.post ('/register', authController.register)
//login 
router.post ('/login', authController.login) 
//logout
router.post('/logout', authController.logout)


//refresh

//blog


export default router;