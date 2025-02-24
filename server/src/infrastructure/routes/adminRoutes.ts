import express from "express";
import adminController from "../../adapters/controllers/adminController";
import tokenService from "../../usecases/tokenService";
import {  verifyTokenAdmin } from "../../adapters/middlewares/authMiddleware";

const router = express.Router();
router.post('/login',adminController.login)
router.post('/refresh-token',tokenService.refreshToken)
router.get("/users",verifyTokenAdmin,adminController.getUsers);
router.post('/block-user',verifyTokenAdmin,adminController.blockUser)
router.delete('/delete-user',verifyTokenAdmin,adminController.deleteUser)

export default router;
