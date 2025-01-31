
import mongoose from "mongoose";
const commentSchema  = new mongoose.Schema({
    content : {type : String, required:true},
    blog: {type : mongoose.SchemaTypes.ObjectId , ref:'Blog'},
    author : {type : mongoose.SchemaTypes.ObjectId , ref:'User'},
    timestamps : true
})
const commentModel= mongoose.model('Comment' , commentSchema, 'comments')
export default commentModel;