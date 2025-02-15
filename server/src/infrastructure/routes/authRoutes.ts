import express from "express";
import authController from "../../adapters/controllers/userController";

const router = express.Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post('/refresh-token',authController.refreshToken)

export default router;
