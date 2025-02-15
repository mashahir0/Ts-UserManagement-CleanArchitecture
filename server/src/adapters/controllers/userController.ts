import { Request, Response } from "express";
import authService from "../../usecases/userService";

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
      const { user, accessToken, refreshToken } = await authService.login(
        req.body.email,
        req.body.password
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(200).json({ user, accessToken });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
 

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies; 

      if (!refreshToken)
        return res.status(401).json({ error: "No token provided" });

      const newToken = await authService.refreshToken(refreshToken);

      res.status(200).json(newToken);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
};

export default authController;
