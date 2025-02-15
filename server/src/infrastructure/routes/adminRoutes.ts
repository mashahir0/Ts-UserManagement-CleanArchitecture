import express from "express";
import adminController from "../../adapters/controllers/adminController";

const router = express.Router();
router.post('/login',adminController.login)
router.get("/users", adminController.getUsers);

export default router;
