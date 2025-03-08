import { Request, Response } from "express";
import postServices from "../../usecases/postService";

interface AuthenticatedRequest extends Request {
    user?: { id: string; name: string; email: string; role: string }; 
  }

const postController = {
    async addPost(req:AuthenticatedRequest,res:Response){
    try {
        const userId = req.user?.id
        if(!userId) throw new Error('user is not authenticated ')
        const {text} = req.body
        await postServices.createPost(userId,text)
        res.status(200).json({message :'post created successfully'})
    } catch (error :any) {
        res.status(400).json({error : error.message})
    }
    }
}

export default postController