import mongoose from "mongoose";
interface IHistoryToken {
    token: string;
    status: string;
    userId: mongoose.Types.ObjectId;
}

const historyTokenSchema = new mongoose.Schema<IHistoryToken>({
    token: { type: String, required: true, unique: true },
    status: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const HistoryToken = mongoose.model<IHistoryToken>('historyToken', historyTokenSchema);
export default HistoryToken;