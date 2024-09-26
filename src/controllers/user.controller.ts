import { IUserService } from "../services/interfaces/i.user.service";
import { Request, Response } from 'express';
import { IUserController } from "./interfaces/i.user.controller";
import { IToken } from "../entities/i.user.entity";

class UserController implements IUserController{
    private userService : IUserService;

    constructor(userService : IUserService){
        this.userService = userService;
    }

    public async signUp(req: Request, res: Response): Promise<void>{
        const {name, email, password} = req.body
        
        try {
            await this.userService.signUp(name, email, password);
            res.status(201).send('User registered successfully');
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    public async signIn(req: Request, res: Response): Promise<void>{
        const {email, password} = req.body
        
        try {
            const user = await this.userService.signIn(email, password);
            res.status(200).send(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    public async refreshToken(req: Request, res: Response): Promise<void> {
        const refreshToken = req.body.refreshToken
        try{
            const newtoken : IToken = await this.userService.refreshToken(refreshToken)
            res.status(200).send(newtoken)
        }catch(error){
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }

    }
}

export {UserController}