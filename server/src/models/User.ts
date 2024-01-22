import { Schema, model, connect } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;    
    avatar: string;
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
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dcavctpft/image/upload/v1705873948/recipes/coco_xf92zy.jpg'
    }
})

const User = model<IUser>('User', UserSchema);
export default User;
