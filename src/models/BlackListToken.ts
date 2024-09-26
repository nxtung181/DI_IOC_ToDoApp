import mongoose, { ObjectId } from "mongoose";
interface IToken {
    token: string;
    reason: string;
    userId: mongoose.Types.ObjectId;
}

const blackListTokenSchema = new mongoose.Schema<IToken>({
    token: { type: String, required: true, unique: true },
    reason: { type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const BlackListToken = mongoose.model<IToken>('blackListToken', blackListTokenSchema);
export default BlackListToken;