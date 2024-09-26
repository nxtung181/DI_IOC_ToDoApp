import { Router } from 'express';
import { IUserController } from '../controllers/interfaces/i.user.controller';

export class UserRoute {
    public router: Router;
    private userController: IUserController;

    constructor(userController : IUserController) {
        this.router = Router();
        this.userController = userController;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/signup',(req, res) => this.userController.signUp(req, res));
        this.router.post('/signin', (req, res) => this.userController.signIn(req, res));
        this.router.post('/refreshToken', (req, res) => this.userController.refreshToken(req, res));
    }
}