import express from "express";
import userController from "../../adapters/controllers/userController";
import { loginLimiter } from "../../adapters/middlewares/protectionMiddleware";
import { verifyToken } from "../../adapters/middlewares/authMiddleware";


const router = express.Router();
router.post("/register", userController.register);
router.post("/login",loginLimiter,userController.login);

router.post("/auth/google", userController.googleAuth);

  

router.post('/refresh-token',userController.refreshToken)
router.get('/get-details',verifyToken,userController.getUserData)

export default router;
