import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserRepository from "../../infrastructure/repositories/userRepository";
import { IUser } from "../../domain/User";
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No access token" });
  }

  try {
    // Decode the token and assign the full user info to req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };
    req.user = decoded;

    // Console log the full decoded user info
    console.log("Decoded User Info:", req.user);

    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const verifyTokenAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No access token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = decoded;
    
    const isAdmin = (await UserRepository.findById(
      req.user.id
    )) as IUser | null;

    if (!isAdmin) return res.status(401).json({ message: "user not found" });
    if (isAdmin.role === "user") {
      return res.status(401).json({ message: "admin protected route" });
    }
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
