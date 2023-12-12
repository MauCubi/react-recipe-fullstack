import { Schema, model, connect } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;    
  }

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model<IUser>('User', UserSchema);
export default User;
