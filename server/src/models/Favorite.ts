import { Schema, model, Types } from 'mongoose';

export interface IFavorite {
    user: Types.ObjectId
    recipe: Types.ObjectId
  }

const FavoriteSchema = new Schema<IFavorite>({
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

const Favorite = model<IFavorite>('Favorite', FavoriteSchema);
export default Favorite;
