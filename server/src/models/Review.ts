import { Schema, model, Types } from 'mongoose';

export interface IReview {
    rating: number,
    comment: string,
    user: Types.ObjectId
    recipe: Types.ObjectId
  }

const ReviewSchema = new Schema<IReview>({
    rating: {
        type: Number,
        required:true,
        unique: false,
    },
    comment: {
        type: String,
        required: false,
        unique: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
})

const Review = model<IReview>('Review', ReviewSchema);
export default Review;
