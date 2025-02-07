import bcrypt, { genSalt } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userRepository from '../infrastructure/repositories/userRepository'
import { User } from '../domain/User'
import mongoose from 'mongoose'



const generateTocken  = (user:User) : string =>{
    return jwt.sign({id : user.id, email : user.email},process.env.JWT_SECRET!,{expiresIn: '1h'}) 
}

const authService = {
     async register(userData : {name : string , email : string, password : string}){
        const userExistance = await userRepository.findByEmailId(userData.email)
        if(userExistance) throw new Error('user already exist') 
        
        const hashedPassword = await bcrypt.hash(userData.password,10)
        const user = new User(null ,userData.name,userData.email,hashedPassword)
        return await userRepository.save(user)
     },

     async login(email : string | null | undefined,password : string){
        if (!email) throw new Error("Email is required.");
        const userDocument  = await userRepository.findByEmailId(email)
        if(!userDocument || !userDocument.password ) throw new Error('no user found in this email')
        
        const isMatch = await bcrypt.compare(password,userDocument.password) 
        if(!isMatch) throw new Error('invalid password')

         const user =new User(
            (userDocument._id as mongoose.Types.ObjectId).toString(), 
            userDocument.name,
            userDocument.email,
            userDocument.password
         )

        return {user ,tocken:generateTocken(user)}
     }
}

export default authService