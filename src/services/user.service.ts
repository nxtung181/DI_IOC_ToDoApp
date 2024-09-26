import { IToken, IUser, IUserRes } from "../entities/i.user.entity";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../ultils";
import { IUserService } from "./interfaces/i.user.service";
import bcrypt from "bcryptjs"
import { IUserRepositoy } from "../repositories/interfaces/i.user.repo";
import { ITokenRepository } from "../repositories/interfaces/i.token.repo";

export class UserService implements IUserService {
    private userRepository : IUserRepositoy

    private tokenRepository: ITokenRepository
    constructor(userRepository : IUserRepositoy, tokenRepository: ITokenRepository){
        this.userRepository = userRepository
        this.tokenRepository = tokenRepository
    }
    
    async signUp(name: string, email: string, password: string): Promise<void> {
        const user = await this.userRepository.findUserByEmail(email)
        if (user) {
            throw new Error('user existed')
        } else {
            const hashedPassword = bcrypt.hashSync(password, 8)
            await this.userRepository.addUser(name, email, hashedPassword)
        }
    }

    async signIn(email: string, password: string): Promise<IUserRes> {
        const user = await this.userRepository.findUserByEmail(email)
        if (user && bcrypt.compareSync(password, user.password)) {

            let accessToken = generateAccessToken(user)
            let refreshToken = generateRefreshToken(user)
            await this.tokenRepository.addToHistoryToken(refreshToken, user._id)
            const userLogin: IUserRes = {
                user,
                accessToken,
                refreshToken
            }
            return userLogin
        } else {
            throw new Error("email or password incorrect")
        }
    }

    async refreshToken(refreshToken: string): Promise<IToken> {
        const checkBlackListToken = await this.tokenRepository.findInBlackListToken(refreshToken)
        if (checkBlackListToken) {
            await this.tokenRepository.deleteInHistoryToken(checkBlackListToken.userId)
            throw new Error("Denied")
        } else {
            const decoded = verifyRefreshToken(refreshToken)
            const newAccessToken = generateAccessToken(decoded)
            const newRefreshToken = generateRefreshToken(decoded)
            await Promise.all([
                this.tokenRepository.addToHistoryToken(newRefreshToken, decoded._id),
                this.tokenRepository.addToBlackListToken(refreshToken, 'replaced', decoded._id)
            ]);
            const newToken: IToken = { accessToken: newAccessToken, refreshToken: newRefreshToken }
            return newToken
        }
    }

}