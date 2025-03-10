import express from "express";
import postController from "../controllers/postController";
import { authorizeRoles, verifyToken } from "../../infrastructure/middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/add-post",
  verifyToken(),
  authorizeRoles(["user"]),
  postController.addPost
);

export default router;
