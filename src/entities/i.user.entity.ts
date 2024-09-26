import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}
export interface IUserRes {
    user: IUser
    accessToken: string;
    refreshToken: string;
}

export interface  IUserAuth {
    _id: Types.ObjectId,
    email: string,
    name: string
};

export interface  IToken {
    accessToken: string,
    refreshToken: string
};

export interface  IBlackListToken {
    token: string,
    userId: Types.ObjectId
};