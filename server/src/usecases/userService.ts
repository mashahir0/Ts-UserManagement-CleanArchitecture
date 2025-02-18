import bcrypt from "bcryptjs";
import UserRepository from "../infrastructure/repositories/userRepository";
import tokenService from "./tokenService";
import { User, IUser } from "../domain/User";

const userService = {
  async register(userData: { name: string; email: string; password: string }) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User(null, userData.name, userData.email, hashedPassword);
    return await UserRepository.save(user);
  },

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const userData = user as IUser;

    const accessToken = tokenService.generateToken(userData, "15m");
    const refreshToken = tokenService.generateToken(userData, "7d");

    return { user: userData, accessToken, refreshToken };
  },
  async getUserDetails(id: string) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return { userData: user };
  },
};

export default userService;
