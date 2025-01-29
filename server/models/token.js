import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        token: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    },
    { timestamps: true }
);

const tokenModel = mongoose.model('RefreshToken', schema, 'tokens');
export default tokenModel;
