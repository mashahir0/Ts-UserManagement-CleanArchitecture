import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;   // Mongoose uses _id, but we use id for consistency
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";  // Defining user role
}

// You can still keep the User class for creating new User instances
export class User {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public password: string,
    public role: "user" | "admin" = "user"
  ) {}
}

