import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken"; 
import UserRepository from "../infrastructure/repositories/userRepository";
import { User, IUser } from "../domain/User";
import dotenv from "dotenv";

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

const generateToken = (user: IUser, expiresIn: string | number) => {
  if (typeof expiresIn !== "string" && typeof expiresIn !== "number") {
    throw new Error("expiresIn must be a valid string or number");
  }

  const options: SignOptions = {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    options
  );
};

const authService = {
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

    const accessToken = generateToken(userData, "15m");
    const refreshToken = generateToken(userData, "7d");

    return { user: userData, accessToken, refreshToken };
  },

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

      if (!payload.id) throw new Error("Invalid token");

      const user = await UserRepository.findById(payload.id);
      if (!user) throw new Error("User not found");

      const userData = user as IUser;

      const newAccessToken = generateToken(userData, "15m");

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  },
};

export default authService;
