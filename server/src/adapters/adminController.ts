import { Request, Response } from "express";
import UserRepository from "../infrastructure/repositories/userRepository";

const adminController = {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  // async login(req:Request,res:Response){
  //   try {
  //     const user = a
  //   } catch (error) {
      
  //   }
  // }
};

export default adminController;
