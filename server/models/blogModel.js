import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    photoPath: { type: String, required: true }, // This field stores the path of the uploaded photo
    path: { type: String, required: true }, // If this is required, make sure you provide it
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
 {timestamps: true}
);

const blogModel= mongoose.model('blog' , blogSchema , 'blogs')

export default blogModel;