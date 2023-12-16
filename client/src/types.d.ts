import { AxiosError } from 'axios';

export interface User {
    name: string,
    email: string,
    password: string
}

export interface ITime {
    time: number,
    unit: string
}

export interface IIngredients {
    name: string,
    quantity: string,
    unit: string
}

export interface ISteps {
    name: string,
}

export interface Category {
    _id: string,
    name: string,
}

export interface Recipe {
    _id: string
    name: string
    description: string
    category: Category
    cookTime: ITime
    steps: ISteps[]
    ingredients: IIngredients[]   
    image: string
    user: User
}


export interface AuthAxiosError extends AxiosError {
    response: {
        data: {
            ok: boolean,
            msg: string
        }
    }
}
