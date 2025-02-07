import express from "express";
import authController from "../adapters/authController";

const router = express.Router()

router.post('/register',authController.register)
router.post('/login',authController.login)

export default router