import { IUser } from "../entities/i.user.entity";
import User from "../models/User";
import { IUserRepositoy } from "./interfaces/i.user.repo";

export class UserRepository implements IUserRepositoy{
    public async findUserByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({email})
        return user
    }
    public async addUser(name: string, email: string, password: string): Promise<void> {
        const newUser = new User({ name, email, password });
        await newUser.save();
    }
}