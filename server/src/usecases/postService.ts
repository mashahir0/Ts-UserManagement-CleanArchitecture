import { IPost, Post } from "../domain/Post";
import postRepository from "../infrastructure/repositories/postRepository";

const postServices = {
    async createPost(userId : string , text : string){
        const post = new Post(userId , text) 
        return await postRepository.save(post)
    }
}


export default postServices