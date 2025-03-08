import express from "express";
import userController from "../controllers/userController";
import { loginLimiter } from "../middlewares/protectionMiddleware";
import {
  authorizeRoles,
  verifyToken,
} from "../middlewares/authMiddleware";
import postController from "../controllers/postController";

const router = express.Router();
router.post("/refresh-token", userController.refreshToken);

router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/auth/google", userController.googleAuth);

router.get(
  "/get-details",
  verifyToken(),
  authorizeRoles(["user", "admin"]),
  userController.getUserData
);


router.post('/add-post',postController.addPost)

export default router;
