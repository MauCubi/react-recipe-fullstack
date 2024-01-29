import { AxiosError } from 'axios';

export interface User {
    _id: string,
    uid: string,
    name: string,
    email: string,
    password: string,
    avatar: string
}

export interface ProfileUser extends User {
    recipesCount: number,
    favoritesCount: number,
    reviewsCount: number,
    commentsCoun: number
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
    rating: number
    cookTime: ITime
    steps: ISteps[]
    ingredients: IIngredients[]   
    image: string
    user: User
}

export interface Favorite {
    _id: string
    recipe: Recipe
}

export interface Review {
    _id: string
    rating: number
    comment: string
    recipe: Recipe | string
    user: User
}

export interface ReviewsInfo {    
    average: number
    sum: number
    num: number
}

export interface ReviewDistribution {
    value: number,
    quantity: number,
    percentage: number
}


export interface AuthAxiosError extends AxiosError {
    response: {
        data: {
            ok: boolean,
            msg: string
        }
    }
}

export interface Pagination {
    count: number,
    pageCount: number
}