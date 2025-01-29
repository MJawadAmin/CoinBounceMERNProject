import dotenv from 'dotenv'
dotenv.config()
const PORT =process.env.PORT
const MONGO_DB = process.env.MONGO_URL
const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET

export default {
    PORT, 
    MONGO_DB,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
}