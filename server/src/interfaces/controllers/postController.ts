import { Request, Response } from "express";
import postServices from "../../usecases/postService";


const postController = {
    async addPost(req:Request,res:Response){
    try {
        const post = postServices.createPost(req.body)
        res.status(200).json({message :'post created successfully'})
    } catch (error :any) {
        res.status(400).json({error : error.message})
    }
    }
}

export default postController