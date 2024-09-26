import { IUser } from "../../entities/i.user.entity";

export interface IUserRepositoy {
    findUserByEmail(email: string): Promise<IUser | null>
    addUser(name: string, email: string, password: string): Promise<void>
}