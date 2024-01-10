import { Int32 } from 'mongodb';
import { Schema, model, connect, Types } from 'mongoose';

export interface IIngredients {
    name: string
    quantity: string
    unit: string
}

export interface ITime {
    time: Number
    unit: string
}

export interface ISteps {
    name: string
}

export interface IRecipe {
    name: string
    description: string
    rating: number
    category: Types.ObjectId
    cookTime: ITime
    steps: ISteps[]
    ingredients: IIngredients[]   
    image: string
    user: Types.ObjectId
    createdAt: Date
}

const ingredientsSchema: Schema<IIngredients> = new Schema({
    name: {type: String}, 
    quantity: {type: String}, 
    unit: {type: String}, 
    });

const timeSchema: Schema<ITime> = new Schema({
    time: {type: Number}, 
    unit: {type: String}, 
    });

const stepsSchema: Schema<ISteps> = new Schema({
    name: { type: String },
    });


const RecipeSchema = new Schema<IRecipe>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: { 
        type: String,
        required: true,
        unique: true
    },
    rating: { 
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    cookTime: {
        type: timeSchema,
        required: true
    },
    steps: {
        type: [stepsSchema],
        required: true
    },
    ingredients: {
        type: [ingredientsSchema],
        required: true
    },
    image: {
        type: String,
        required: true
    },    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })  

const Recipe = model<IRecipe>('Recipe', RecipeSchema);
export default Recipe;
