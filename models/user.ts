import { Schema, Types, models, model } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    status: boolean;
    createdAt: Date;
    avatar?: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    avatar: { type: String }
});

const User = models.User || model<IUser>("User", userSchema);
export default User;