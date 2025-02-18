import { IUser, User } from "../domain/User";
import tokenService from "./tokenService";
import UserRepository from "../infrastructure/repositories/userRepository";
import bcrypt from "bcryptjs";

const adminServices = {
  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("invalid credentials");
    if (user.role !== "admin")
      throw new Error("user dont have permission to enter");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("invalid credentials ");

    const userData = user as IUser;

    const accessToken = tokenService.generateToken(userData, "1d");
    const refreshToken = tokenService.generateToken(userData, "7d");
    return { admin: userData, accessToken, refreshToken };
  },
};

export default adminServices;
