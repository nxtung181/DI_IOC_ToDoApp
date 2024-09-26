import { Request, Response } from 'express';
export interface IUserController{
    signUp(req: Request, res: Response): Promise<void>
    signIn(req: Request, res: Response): Promise<void>
    refreshToken(req: Request, res: Response): Promise<void>
}