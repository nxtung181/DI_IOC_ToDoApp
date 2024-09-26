import { SortOrder, Types } from "mongoose"
import { ITask } from "../../entities/i.task.entity"

export interface ITaskRepository {
    deleteTask(taskId: string): Promise<void>
    editTask(taskId: string, updatedTask: ITask): Promise<void>
    addTask(newTask: ITask): Promise<void>
    getTaskById(taskId: string): Promise<ITask|null>
    getTasks(userId: Types.ObjectId, page: number, pageSize: number): Promise<ITask[] | null>
    countTasks(userId: Types.ObjectId): Promise<number>
    searchTask(query: Record<string, any>, sortOptions: Record<string, SortOrder>): Promise<ITask[] | null>
}