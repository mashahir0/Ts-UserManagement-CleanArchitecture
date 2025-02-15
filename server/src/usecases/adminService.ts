
import jwt, { SignOptions } from "jsonwebtoken";
import { IUser, User } from "../domain/User";
import dotenv from 'dotenv'
import UserRepository from "../infrastructure/repositories/userRepository";
import bcrypt from 'bcryptjs'

dotenv.config()


const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

const generateToken = (user:IUser, expiresIn : string | number)  => {
    const options : SignOptions = {expiresIn : expiresIn as jwt.SignOptions['expiresIn']}
    return jwt.sign(
        {id:user.id, email: user.email},
        JWT_SECRET,
        options
    )
}


const adminServices = {
     async login(email : string , password : string) {
        const user = await UserRepository.findByEmail(email)
        if(!user) throw new Error('invalid credentials')
        if(user.role !== 'admin') throw new Error('user dont have permission to enter')
        
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch) throw new Error('invalid credentials ')
        
        const userData = user as IUser

        const accessToken = generateToken(userData,'1d')
        const refreshToken = generateToken(userData,'7d')
        return {admin : userData ,accessToken,refreshToken }
     }
}

export default adminServices