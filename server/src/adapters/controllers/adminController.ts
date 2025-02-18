import { Request, Response } from "express";
import UserRepository from "../../infrastructure/repositories/userRepository";
import adminServices from "../../usecases/adminService";

const adminController = {
  async login(req: Request, res: Response) {
    try {
      const { admin, accessToken, refreshToken } = await adminServices.login(
        req.body.email,
        req.body.password
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(200).json({ admin, accessToken });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default adminController;
