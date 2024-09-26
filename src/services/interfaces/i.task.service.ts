import { ITask, ITaskPagination } from "../../entities/i.task.entity";
import { Types } from "mongoose";

export interface ITaskService{
    getTasks(userId : Types.ObjectId, page: number, pageSize: number): Promise<ITaskPagination | null>
    getDetailTask(taskId: string): Promise<ITask | null>
    createTask(newTask: ITask): Promise<void>;
    editTask(taskId: string, updatedTask: ITask): Promise<void>;
    deleteTask(taskId: string): Promise<void>;
    searchTask(userId: Types.ObjectId, title: string, status: string, sortBy: string): Promise<ITask[]| null>;
}