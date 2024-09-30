import mongoose from "mongoose";
import { ITask } from "../entities/i.task.entity";

const taskSchema = new mongoose.Schema<ITask>({
    title:{type: String, required: true},
    description: String,
    createdAt: {type: Date, default: Date.now},
    completeAt: Date,
    status: {type: String, 
        enum:['todo', 'inProgress', 'completed', 'deleted'],
        default: 'todo'
    },
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})
const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;