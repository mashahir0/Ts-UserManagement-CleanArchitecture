import UserModel from "../models/userModel";
import { User } from "../../domain/User";

const UserRepository = {
  async save(user: User) {
    return await new UserModel(user).save();
  },
  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  },
  async findById(id: string) {
    return await UserModel.findById(id);
  },
  async getAllUsers() {
    return await UserModel.find();
  },
};

export default UserRepository;
