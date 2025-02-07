import { Request, Response } from "express";
import authService from "../usecases/authService";

const authController = {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { user, tocken } = await authService.login(
        req.body.email,
        req.body.password
      );
      console.log(user)
      res.status(201).json({ user, tocken });
    } catch (error : any) {
        res.status(400).json({error : error.message})
    }
  },
};

export default authController