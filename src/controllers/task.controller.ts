import { Request, Response } from "express";
import { ITaskController } from "./interfaces/i.task.controller";
import { ITaskService } from "../services/interfaces/i.task.service";
import { ITask } from "../entities/i.task.entity";

export class TaskController implements ITaskController {
    private taskService: ITaskService

    constructor(taskService: ITaskService) {
        this.taskService = taskService
    }

    public async getTasks(req: Request, res: Response): Promise<void> {
        try {
            const page = req.query.page || 0
            const pageSize = req.query.pageSize || 30
            const userId = req.user._id
            const tasks = await this.taskService.getTasks(userId, parseInt(page.toString()), parseInt(pageSize.toString()))
            if (!tasks) {
                res.status(200).send({ message: "No task" })
            }
            res.status(200).send(tasks)
        } catch (e) {
            res.send(500).send({ message: 'Internal Server Error' })
        }
    }

    public async getDetailTask(req: Request, res: Response): Promise<void> {
        try {
            const taskId = req.params.id
            const task = await this.taskService.getDetailTask(taskId)
            if (!task) {
                res.status(200).send({ message: 'No task' })
            }
            res.status(200).send(task)
        } catch (e) {
            res.send(500).send({ message: 'Internal Server Error' })
        }
    }

    public async createTask(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, createdAt, completeAt, status } = req.body
            const user = req.user._id
            if (!title || !description) {
                res.send({ message: "miss params" })
            }
            const newTask: ITask = { title, description, createdAt, completeAt, status, user }
            await this.taskService.createTask(newTask)
            res.status(200).send({ message: "Create Task Successfully" })

        } catch (e) {
            res.send(500).send({ message: 'Internal Server Error' })
        }
    }

    public async editTask(req: Request, res: Response): Promise<void> {
        try {
            const taskId = req.params.id
            const { title, description, createdAt, completeAt, status } = req.body
            const updatedTask: ITask = {
                title, description, createdAt, completeAt, status
            }
            await this.taskService.editTask(taskId, updatedTask)
            res.status(200).send({ message: 'edit successfully' })
        } catch (e) {
            res.status(500).send({ message: 'Internal Server Error' })
        }
    }
    public async deleteTask(req: Request, res: Response): Promise<void> {
        try {
            const taskId = req.params.id
            await this.taskService.deleteTask(taskId)
            res.status(200).send({ message: 'deleted' })
        } catch (e) {
            res.send(500).send({ message: 'Internal Server Error' })
        }
    }
    public async searchTask(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user._id
            const title = req.query.title
            const status = req.query.status
            const sortBy = req.query.sortBy

            const tasks = await this.taskService.searchTask(userId, title as string, status as string, sortBy as string)
            if(!tasks){
                res.status(200).send({message:'no task matching'})
            }
            res.status(200).send({ tasks })
        } catch (e) {
            res.send(500).send({ message: 'Internal Server Error' })
        }
    }
}