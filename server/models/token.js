import mongoose from "mongoose";
const schema = new mongoose.Schema({
    token : {type : String , required: true },
    userId: {type : mongoose.SchemaType.ObjectId, ref: 'users'}
},
{timestamps: true}
)
const tokenModel= new mongoose.model('RefreshToken', schema, 'tokens');
export default tokenModel;