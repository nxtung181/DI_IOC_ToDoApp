import { Router } from "express";
import { ITaskController } from "../controllers/interfaces/i.task.controller";
import { verifyAccessToken } from "../ultils";

export class TaskRoute {
    public router: Router;
    private taskController: ITaskController;

    constructor(taskController : ITaskController) {
        this.router = Router();
        
        this.taskController = taskController;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/createTask', verifyAccessToken ,(req, res) => this.taskController.createTask(req, res));
        this.router.get('/allTasks', verifyAccessToken ,(req, res) => this.taskController.getTasks(req, res));
        this.router.get('/detail/:id', verifyAccessToken ,(req, res) => this.taskController.getDetailTask(req, res));
        this.router.put('/editTask/:id', verifyAccessToken ,(req, res) => this.taskController.editTask(req, res));
        this.router.delete('/delete/:id', verifyAccessToken ,(req, res) => this.taskController.deleteTask(req, res));
        this.router.get('/search', verifyAccessToken ,(req, res) => this.taskController.searchTask(req, res));

    }
}