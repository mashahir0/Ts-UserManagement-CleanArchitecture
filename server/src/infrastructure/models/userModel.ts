// models/userModel.ts
import mongoose, { Model, Document } from "mongoose";
import { IUser } from "../../domain/User";
// Define the IUser interface for the Mongoose document
// export interface IUser {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   active : "Active" | "Blocked";
//   role: 'user' | 'admin';
// }

// Define the Mongoose schema
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  userStatus:  {type : String , enum: ["Active", "Blocked"], default : 'Active'},
  role: { type: String, default: 'user' },
});

// Create the Mongoose model
const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;



