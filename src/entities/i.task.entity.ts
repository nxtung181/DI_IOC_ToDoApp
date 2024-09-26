import { Types } from "mongoose";


export interface ITask{
    _id?: Types.ObjectId
    title: string;
    description: string;
    createdAt: Date;
    completeAt: Date;
    status: string;
    user?: Types.ObjectId;
}

export type ITaskPagination = {
    tasks: ITask[],
    page: number,
    pageSize: number,
    totalPages: number

}
