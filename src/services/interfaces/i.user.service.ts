import { IToken, IUser, IUserRes } from "../../entities/i.user.entity";

export interface IUserService{
    signUp(name: string, email: string, password: String): Promise<void>;
    signIn(email: string, password: string): Promise<IUserRes>;
    refreshToken(refreshToken: string): Promise<IToken>;
}