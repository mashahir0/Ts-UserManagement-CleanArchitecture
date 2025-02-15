import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;  
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";  
}

export class User {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public password: string,
    public role: "user" | "admin" = "user"
  ) {}
}

