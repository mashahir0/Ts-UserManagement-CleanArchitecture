import { IPost } from "../../domain/Post";
import postModel from "../../domain/models/postModel";

const postRepository =  {
 async save(post : IPost){
    return await new postModel(post).save()
 },
 async find(post : IPost){
    return await postModel.find()
 },
}

export default postRepository