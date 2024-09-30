import mongoose from "mongoose";
import { IUser } from "../entities/i.user.entity";
  
  const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required:true },
    createdAt:{type: Date, default: Date.now},
  });
  
  const User = mongoose.model<IUser>('User', userSchema);
  export default User;