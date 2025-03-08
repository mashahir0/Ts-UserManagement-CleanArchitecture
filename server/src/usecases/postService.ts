import { IPost, Post } from "../domain/Post";
import postRepository from "../infrastructure/repositories/postRepository";

const postServices = {
    async createPost(postData : {userId : string , text : string}){
        const post = new Post(postData.userId , postData.text) 
        return await postRepository.save(post)
    }
}


export default postServices