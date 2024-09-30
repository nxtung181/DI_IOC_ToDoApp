import { SortOrder, Types } from "mongoose";
import { ITask} from "../entities/i.task.entity";
import Task from "../models/Task";
import { ITaskRepository } from "./interfaces/i.task.repo";

export class TaskRepository implements ITaskRepository{
    
    public async getTasks(userId: Types.ObjectId, page: number, pageSize: number): Promise<ITask[] | null> {
        const tasks = await Task.find({user: userId, status: {$ne : 'deleted'}})
                                .skip((page-1)*pageSize)
                                .limit(pageSize)
                                .lean()
        return tasks
    }

    public async deleteTask(taskId: string): Promise<void> {
       await Task.findOneAndUpdate({_id: taskId}, {status: 'deleted'})
    }
    public async editTask(taskId: string, updatedTask: ITask): Promise<void> {
        await Task.findOneAndUpdate({_id: taskId}, updatedTask)
    }
    public async addTask(newTask: ITask): Promise<void> {
        await Task.create(newTask)
    }
    public async getTaskById(taskId: string): Promise<ITask | null> {
        const task = await Task.findOne({_id: taskId})
        return task
    }
    public async searchTask(query: Record<string, any>, sortOptions: Record<string, SortOrder>): Promise<ITask[] | null> {
        const tasks = await Task.find(query).sort(sortOptions)
        return tasks
    }
    public async countTasks(userId: Types.ObjectId): Promise<number> {
        const totalTasks = await Task.countDocuments({user: userId, status:{$ne: 'deleted'}})
        return totalTasks
    }
}