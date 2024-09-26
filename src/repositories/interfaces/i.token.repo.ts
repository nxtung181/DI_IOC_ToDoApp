import { Types } from "mongoose"
import { IBlackListToken} from "../../entities/i.user.entity"

export interface ITokenRepository {
    addToHistoryToken(token: string, userId: Types.ObjectId): Promise<void>
    addToBlackListToken(token: string, reason: string, userId: Types.ObjectId): Promise<void>
    deleteInHistoryToken(userId: Types.ObjectId): Promise<void>
    findInBlackListToken(token: string):Promise<IBlackListToken | null>
}