import Joi from 'joi'; // Directly import Joi without destructuring
import commentModel from "../models/commentsModels.js";
import CommentDTO from "../dto/comment.js";

const MongoDbPattern = /^[0-9a-fA-F]{24}$/;

const commentController = {
    async create(req, res, next) { // Added 'next' as it was missing in the parameters
        const createCommentSchema = Joi.object({
            content: Joi.string().required(),  // Use Joi for validation
            author: Joi.string().regex(MongoDbPattern).required(),
            blog: Joi.string().regex(MongoDbPattern).required()
        });

        const { error } = createCommentSchema.validate(req.body);
        if (error) {
            return next(error); // Passing error to next
        }

        const { content, author, blog } = req.body;
        try {
            const newComment = new commentModel({
                content, author, blog
            });
            await newComment.save();
        } catch (error) {
            return next(error);
        }

        return res.status(201).json({ message: 'comment created' });
    },
    async getById(req, res, next) { 
        // Implementation goes here
        const getByIdSchema=Joi.object({
            id: Joi.string().regex(MongoDbPattern).required()
        });
        const {error}=getByIdSchema.validate(req.params)
        if(error){
            return next(error)
        }
        const {id}= req.params
        let comments;
        try {
           comments = await commentModel.find({blog:id}).populate('author')
            
        } catch (error) {
            return next(error)  
        }
        let commentDTOArray = [];  

        for (let i=0; i<comments.length; i++){
            const obj = new CommentDTO(comments[i]);  // ✅ Use correct class name
            commentDTOArray.push(obj);
        }
        return res.status(200).json({ data: commentDTOArray });  // ✅ Return correctly
        
    }
};

export default commentController;
