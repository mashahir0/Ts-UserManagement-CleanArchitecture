import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken"; // Import SignOptions from jsonwebtoken
import UserRepository from "../infrastructure/repositories/userRepository";
import { User, IUser } from "../domain/User";
import dotenv from "dotenv";

dotenv.config();

// Ensure JWT_SECRET is treated as a string
const JWT_SECRET = process.env.JWT_SECRET ;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

// Function to generate JWT token with valid expiresIn
const generateToken = (user: IUser, expiresIn: string | number) => {
  // Ensure expiresIn is a valid ms.StringValue or number
  if (typeof expiresIn !== "string" && typeof expiresIn !== "number") {
    throw new Error("expiresIn must be a valid string or number");
  }

  // Explicitly cast expiresIn to ms.StringValue | number
  const options: SignOptions = { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] };

  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,  // JWT_SECRET is passed as a string
    options      // Pass the options with expiresIn
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

    // Cast the user object to the correct IUser type
    const userData = user as IUser;

    // Generate Access and Refresh tokens
    const accessToken = generateToken(userData, "15m");  // "15m" for 15 minutes expiration
    const refreshToken = generateToken(userData, "7d");  // "7d" for 7 days expiration

    return { user: userData, accessToken, refreshToken };
  }
};

export default authService;
