import { SortOrder, Types } from "mongoose";
import { ITask, ITaskPagination } from "../entities/i.task.entity";
import { ITaskService } from "./interfaces/i.task.service";
import Task from "../models/Task";
import { ITaskRepository } from "../repositories/interfaces/i.task.repo";

export class TaskService implements ITaskService{
    private taskRepository: ITaskRepository

    constructor(taskRepository: ITaskRepository){
        this.taskRepository = taskRepository
    }

    public async searchTask(userId: Types.ObjectId, title: string, status: string, sortBy: string): Promise<ITask[] | null> {
        const query: Record<string, any> = {};
        query.user = userId
        if(title){
            query.title = { $regex: title, $options: 'i' };
        }
        if(status){
            query.status = status
        }
        const sortOptions: Record<string, SortOrder> = {};
        if (sortBy === 'newest') {
            sortOptions.createdAt = -1;
        } else {
            sortOptions.createdAt = 1;  
        }
        const tasks = await this.taskRepository.searchTask(query, sortOptions)
        return tasks
    }

    public async deleteTask(taskId: string): Promise<void> {
        await this.taskRepository.deleteTask(taskId)
    }

    public async editTask(taskId: string, updatedTask: ITask): Promise<void> {
        await this.taskRepository.editTask(taskId, updatedTask)
    }

    public async createTask(newTask: ITask): Promise<void> {
        await this.taskRepository.addTask(newTask)
    }

    public async getDetailTask(taskId: string): Promise<ITask | null> {
        const task = await this.taskRepository.getTaskById(taskId)
        return task
    }
    
    public async getTasks(userId : Types.ObjectId, page: number, pageSize: number): Promise<ITaskPagination | null> {
        const tasks = await this.taskRepository.getTasks(userId, page, pageSize)
        if(!tasks){
            throw new Error('No task')
        }
        const totalTasks = await this.taskRepository.countTasks(userId)

        const totalPages = Math.ceil(totalTasks/pageSize)
        return {tasks, page, totalPages, pageSize}
    }
}