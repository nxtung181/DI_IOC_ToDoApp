import { Request, Response } from 'express';
export interface ITaskController {
    getTasks(req: Request, res: Response): Promise<void>;
    getDetailTask(req: Request, res: Response): Promise<void>;
    createTask(req: Request, res: Response): Promise<void>;
    editTask(req: Request, res: Response): Promise<void>;
    deleteTask(req: Request, res: Response): Promise<void>;
    searchTask(req: Request, res: Response): Promise<void>;
}