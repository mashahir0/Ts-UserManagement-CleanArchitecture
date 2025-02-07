import { User } from "../../domain/User";
import userModel from "../models/userModel";

const userRepository = {
    async save(user : User){
        const newUser = new userModel({
            name : user.name,
            email : user.email,
            password : user.password
        })
        return await newUser.save()
    },
    
    async findByEmailId (email : string){
        return await userModel.findOne({email})
    }
}


export default userRepository