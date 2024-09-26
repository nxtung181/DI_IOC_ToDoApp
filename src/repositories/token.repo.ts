import { Types } from "mongoose";
import { IBlackListToken, IToken } from "../entities/i.user.entity";
import BlackListToken from "../models/BlackListToken";
import HistoryToken from "../models/HistoryToken";
import { ITokenRepository } from "./interfaces/i.token.repo";

export class TokenRepository implements ITokenRepository{
    public async addToBlackListToken(token: string, reason: string, userId: Types.ObjectId): Promise<void> {
        const blackToken = new BlackListToken({token, reason, userId})
        await blackToken.save()
    }
    public async addToHistoryToken(token: string, userId: Types.ObjectId): Promise<void> {
        const historyToken = new HistoryToken({token, userId})
        await historyToken.save()
    }
    public async deleteInHistoryToken(userId: Types.ObjectId): Promise<void> {
        await HistoryToken.deleteMany({userId: userId})
    }
    public async findInBlackListToken(token: string): Promise<IBlackListToken| null> {
        const blackToken = await BlackListToken.findOne({token: token})
        return blackToken
    }
    
}