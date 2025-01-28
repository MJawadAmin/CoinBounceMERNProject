
import mongoose from "mongoose";
const commentSchema  = new mongoose.Schema({
    content : {type : String, required:true},
    blog: {type : String, required: true},
    author : {type : mongoose.SchemaTypes.ObjectId , ref:'comments'},
    timestamps : true
})
const commentModel= mongoose.model('comment' , commentSchema, 'comments')
export default commentModel;