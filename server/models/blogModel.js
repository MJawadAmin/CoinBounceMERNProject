import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title : {type: String , required : true},
    content : {type: String , required : true},
    path : {type: String , required : true},
    author :{type: mongoose.SchemaTypes.ObjectId, ref: 'users'},
    timestamps:true
})
const blogModel= mongoose.model('blog' , blogSchema , 'blogs')
export default blogModel;