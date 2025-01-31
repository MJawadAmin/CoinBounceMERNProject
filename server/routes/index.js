import express from "express";
import authController from "../controller/authController.js";
import auth from '../middleware/auth.js'
import blogController from "../controller/blogController.js";
const router = express.Router()
//user 

//register
router.post ('/register', authController.register)
//login 
router.post ('/login', authController.login) 
//logout
router.post('/logout',auth, authController.logout)
//refresh
router.get('/refresh', authController.refresh)
//blog
router.post('/blog', auth, blogController.create)
//CRUD
///getall 
router.get('/blog/all', auth , blogController.getAll);
// get blog by id
router.get('/blog/:id', auth , blogController.getById)
//create
//read all blogs
// read blog by id
//update 
router.put('/blog', auth , blogController.update)
// delete 
// router.delete('/blog/:id', auth , blogController.delete)


export default router;