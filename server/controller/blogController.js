import Joi from 'joi'; // Correct import for ESM
import fs from 'fs'; // Correct import

import Blog from '../models/blogModel.js';
import BlogDTO from '../dto/blog.js';
import BlogDetailsDTO from '../dto/blog-details.js';
import config from '../config/index.js';
import { title } from 'process';
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
        

        const blogdto = new BlogDetailsDTO(newBlog);
        return res.status(201).json({ blog: blogdto });
    },
    async getAll(req, res, next) {
        try {
            const blogs = await Blog.find({});
            const blogsDto= [];
            for (let i=0 ; i<blogs.length; i++){
                const dto = new BlogDTO(blogs[i]);
                blogsDto.push(dto)
            }
            return res.status(200).json({blogs: blogsDto})
        } catch (error) {
            return next(error)

           
            
        }
    },
    //Method NO 2
    // //     async getAll(req, res, next) {
//         try {
//             const blogs = await Blog.find({});  // Get all blogs from the database
//             const blogsDto = blogs.map(blog => new BlogDTO(blog));  // Map each blog to its DTO
    
//             return res.status(200).json({ blogs: blogsDto });  // Send the successful response with the DTO
//         } catch (error) {
//             console.error(error);  // Log the error for debugging
//             return res.status(500).json({ message: "An error occurred while fetching the blogs." });  // Return an error response
//         }
//     }
// ,    

async getById(req, res, next) {
    // validation id 
    const getByIdSchema = Joi.object({
        id : Joi.string().regex(MongoDbPattern).required()
    });
    const { error } = getByIdSchema.validate(req.params);
    if (error) {
        return next(error);  // Error if validation fails
    }
    let blog;
    const { id } = req.params;
    try {
        blog = await Blog.findOne({ _id: id }).populate('author');  // Find blog by ID
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" }); // Handle when blog is not found
        }
        console.log(id);
    } catch (error) {
        return next(error);  // Catch and return any error during the query
    }
    const blogsDto = new BlogDTO(blog);  // If blog exists, convert it to DTO
    return res.status(200).json({ blog: blogsDto });  // Return the blog data as JSON
},
//   async getById(req, res, next) {
//     // validate id
//     // response
//     const getByIdSchema = Joi.object({
//       id: Joi.string().regex(mongodbIdPattern).required(),
//     });
//     const { error } = getByIdSchema.validate(req.params);
//     if (error) {
//       return next(error);
//     }
//     let blog;
//     const { id } = req.params;
//     try {
//       blog = await Blog.findOne({ _id: id }).populate("author");
//     } catch (error) {
//       return next(error);
//     }
//     const blogDto = new BlogDetailsDTO(blog);
//     return res.status(200).json({ blog: blogDto });
//   },
async update(req, res, next) {
    const updateBlogSchema = Joi.object({
        /*Error in given code which is solved */
        // title: Joi.string(),
        // author: Joi.string().regex(MongoDbPattern).required(),
        // blogId: Joi.string().regex(MongoDbPattern).required(),
        // photoPath: Joi.string()
        
        // the correct one 
        //   blogId: Joi.string().length(24).hex().required(),
//   author: Joi.string().length(24).hex().required(),
//   title: Joi.string().required(),
//   content: Joi.string().required(),  // ADD THIS LINE if missing
//   photo: Joi.string().optional()
// Method No 2nd
title: Joi.string().required(),
content: Joi.string().required(),
author: Joi.string().regex(MongoDbPattern).required(),
blogId: Joi.string().regex(MongoDbPattern).required(),
photo: Joi.string(),
    });

    const { error } = updateBlogSchema.validate(req.body);
    if (error) {
        return next(error);  // Handle validation errors
    }

    const { title, author, blogId, photo } = req.body;

    let blog;
    try {
        blog = await Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });  // Ensure blog exists
        }
    } catch (error) {
        return next(error);  // Handle any database query errors
    }

    if (photo) {
        let previousPhoto = blog.photoPath;
        previousPhoto = previousPhoto.split('/').at(-1);  // Extract the file name from the path

        try {
            // Delete the previous photo from the server
            fs.unlinkSync(`storage/${previousPhoto}`);

            // Convert new photo to buffer
            const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), "base64");

            // Create a new file path for the new photo
            const imagePath = `${Date.now()}-${author}.png`;

            // Save the new photo to the server
            fs.writeFileSync(`storage/${imagePath}`, buffer);

            // Update the blog with the new photo path
            await Blog.updateOne(
                { _id: blogId },
                { title, photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}` }
            );
        } catch (error) {
            return next(error);  // Handle file system errors
        }
    } else {
        // If no photo is provided, update only the title and content
        await Blog.updateOne(
            { _id: blogId },
            { title, content: req.body.content }  // Ensure content is included in the update
        );
    }

    return res.status(200).json({ message: 'Blog updated',updatedBlog: blog });
}
,

    async delete(req, res , next){
        //Validate
        //delete blog
        //delete comments on this blog
        const delteBlogSchema= Joi.object({
            id : Joi.string().regex(MongoDbPattern).required()
        });
        const {error}=delteBlogSchema.validate(req.params);
        const id = req.params;
        //delete blog
        //delete comments
        try {
            
        } catch (error) {
            
        }
    }
};

export default blogController;
