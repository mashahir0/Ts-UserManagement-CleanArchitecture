import mongoose, { Document, Model } from "mongoose";

// 1️⃣ Define a TypeScript Interface for Type Safety
interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

// 2️⃣ Define the Schema with Strong Typing
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 3️⃣ Create the Mongoose Model with Type Safety
const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default userModel;
