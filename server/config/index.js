import dotenv from 'dotenv'
dotenv.config()
const PORT =process.env.PORT
const MONGO_DB = process.env.MONGO_URL

export default {
    PORT, MONGO_DB
}