// models/userModel.ts
import mongoose, { Model, Document } from "mongoose";

// Define the IUser interface for the Mongoose document
export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

// Define the Mongoose schema
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

// Create the Mongoose model
const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;



