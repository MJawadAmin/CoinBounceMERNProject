import Joi from 'joi'; // Correct import for ESM
import fs from 'fs'; // Correct import

import Blog from '../models/blogModel.js';
import BlogDTO from '../dto/blog.js';
import config from '../config/index.js';

const { BACKEND_SERVER_PATH } = config;
const MongoDbPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {
    async create(req, res, next) {
        const createblogScema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(MongoDbPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string().required()
        });

        const { error } = createblogScema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { title, author, content, photo } = req.body;
        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), "base64");
        const imagePath = `${Date.now()}-${author}.png`;
console.log(error)
        try {
            fs.writeFileSync(`storage/${imagePath}`, buffer);
        } catch (error) {
            return next(error);
        }

        let newBlog;
        try {
            newBlog = new Blog({
                title,
                author,
                content,
                photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
                path: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,  // Ensure 'path' is assigned
            });
            await newBlog.save();
        } catch (error) {
            return next(error);
        }
        

        const blogdto = new BlogDTO(newBlog);
        return res.status(201).json({ blog: blogdto });
    },
    async getAll(req, res, next) {},
    async getById(req, res, next) {},
    async update(req, res, next) {}
};

export default blogController;
