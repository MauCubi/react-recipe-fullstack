import { Request, Response } from 'express';
import Recipe, { IRecipe } from '../models/Recipe';
import {Types, isValidObjectId} from 'mongoose'
import Category from '../models/Category';
import Favorite from '../models/Favorite';
import Review from '../models/Review';


interface RecipeRequest extends Request {
    uid: Types.ObjectId
}

const ITEM_PER_PAGE = 3

export const getRecipe = async (req: RecipeRequest, res: Response) => {

    const recipeId = req.params.id
    
    if (isValidObjectId(recipeId)) {
        
        try {
            const recipe = await Recipe.findById(recipeId).populate(['user','category'])
                    
            if (!recipe) {            
                return res.status(404).json({
                    ok: false,
                    msg: 'Receta con ese id no encontrada'
                })    
            }
    
            return res.json({
                ok: true,
                recipe: recipe
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
    } else {

        return res.status(500).json({
            ok: false,
            msg: 'Id Invalido'
        })
    }

}

export const getRecipes = async (req: Request, res: Response) => {

    // const recipes = await Recipe.find().limit(1).sort({'createdAt': 'desc'})    

    const page = req.query.page || 1
    const skip = (page as number - 1) * ITEM_PER_PAGE

    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder || 'asc'

    const countPromise = Recipe.estimatedDocumentCount()

    const recipesPromise = Recipe.find()
        .populate('user', ['name', 'email'])
        .populate('category', ['name'])
        .skip(skip)
        .limit(ITEM_PER_PAGE)
        .sort({[sortBy.toString()]: (sortOrder==='asc')?1:-1}) 

    const [count, recipes] = await Promise.all([countPromise, recipesPromise])

    const pageCount = count / ITEM_PER_PAGE    
    

        return res.json({
            ok: true,
            recipes,
            pagination:{
                count,
                pageCount
            }
        })

}

export const getRecipesByCategory = async (req: Request, res: Response) => {

    const category = req.params.category    

    const categoryId = await Category.findOne({ name: { $regex: category, $options: 'i' } }).exec()

    const page = req.query.page || 1
    const skip = (page as number - 1) * ITEM_PER_PAGE

    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder || 'asc'
    
    const countPromise = Recipe.find({ category: categoryId._id }).countDocuments()

    const recipesPromise = Recipe.find({ category: categoryId._id })
        .populate('user', ['name', 'email'])
        .populate('category', ['name'])
        .skip(skip)
        .limit(ITEM_PER_PAGE)
        .sort({[sortBy.toString()]: (sortOrder==='asc')?1:-1})    

    const [count, recipes] = await Promise.all([countPromise, recipesPromise])

    const pageCount = count / ITEM_PER_PAGE

        return res.json({
            ok: true,
            recipes,
            pagination:{
                count,
                pageCount
            }
        })

}

export const getRecipesBySearch = async (req: Request, res: Response) => {

    const search = req.params.search.trim()    

    const page = req.query.page || 1
    const skip = (page as number - 1) * ITEM_PER_PAGE

    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder || 'asc'
    
    const countPromise = Recipe.find({ name: { $regex: search, $options: 'i' } }).countDocuments()

    const recipesPromise = Recipe.find({ name: { $regex: search, $options: 'i' } })
        .populate('user', ['name', 'email'])
        .populate('category', ['name'])
        .skip(skip)
        .limit(ITEM_PER_PAGE)    
        .sort({[sortBy.toString()]: (sortOrder==='asc')?1:-1})

    const [count, recipes] = await Promise.all([countPromise, recipesPromise])

    const pageCount = count / ITEM_PER_PAGE

        return res.json({
            ok: true,
            recipes,
            pagination:{
                count,
                pageCount
            }
        })
        

}

export const getRecipesSugestion = async (req: Request, res: Response) => {

    const search = req.params.search.trim()    

    const recipes = await Recipe.find({ name: { $regex: search, $options: 'i' } }).limit(5)
    
        return res.json({
            ok: true,
            recipes
        })

}

export const createRecipe = async (req: RecipeRequest, res: Response) => {

    const recipe = new Recipe(req.body);       

    try {

        recipe.user = req.uid;  
        const savedRecipe = await recipe.save();

        res.json({
            ok:true,
            receta: savedRecipe
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

export const updateRecipe = async (req: RecipeRequest, res: Response) => {
    
    const recipeId = req.params.id;

    try {

        const recipe = await Recipe.findById(recipeId);
        const uid = req.uid;       


        if (!recipe) {
            return res.status(404).json({
                ok: false,
                msg: 'Receta con ese id no existe'
            });
        }

        if (recipe.user.toString() !== uid.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar esta receta'
            });
        };

        const newRecipe = {
            ...req.body,
            user: uid
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate( recipe.id, newRecipe, { new: true } );

        res.json({
            ok: true,
            updatedRecipe
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


export const deleteRecipe = async (req: RecipeRequest, res: Response) => {

    const recipeId = req.params.id;

    try {

        const recipe = await Recipe.findById(recipeId);
        const uid = req.uid;


        if (!recipe) {
            return res.status(404).json({
                ok: false,
                msg: 'Receta con ese id no existe'
            });
        }

        if (recipe.user.toString() !== uid.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar esta receta'
            });
        };

        const deleteRecipePromise = Recipe.findByIdAndDelete( recipe.id );
        const deleteReviewsPromise = Review.deleteMany({recipe: recipe.id})

        await Promise.all([deleteRecipePromise, deleteReviewsPromise])

        res.json({
            ok: true
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

export const addFavoriteRecipe = async (req: RecipeRequest, res: Response) => {
    
    try {           
        
        const recipe = req.params
        const existFavorite = await Favorite.findOne({ user: req.uid, recipe: recipe.id })

        if (!existFavorite) {

            const favorite = new Favorite({
                user: req.uid,
                recipe: recipe.id
            })
            
            const savedFavorite = await favorite.save();

            res.json({
                ok:true,
                msg: `Favorito guardado ${ savedFavorite }`
            })

        } else {

            const deletedFavorite = await Favorite.findByIdAndDelete(existFavorite._id)
            res.json({
                ok:true,
                msg: `Favorito borrado: ${ deletedFavorite }`
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

export const getFavoritesRecipes = async (req: RecipeRequest, res: Response) => {    

    try {
        const favorites = await Favorite.find({user: req.uid}).select({ 'recipe': 1, '_id': 0 })    
            res.json({
                ok: true,
                favorites
            })        
    } catch (error) {

        res.status(400).json({
            ok: false,
            msg:'Error al traer favoritos'
        })        
    }
    
}

export const getFullFavoritesRecipes = async (req: RecipeRequest, res: Response) => {    

    try {
           
        const page = req.query.page || 1
        const skip = (page as number - 1) * ITEM_PER_PAGE

        const sortBy = req.query.sortBy || 'createdAt'
        const sortOrder = req.query.sortOrder || 'asc'
        
        const countPromise = Favorite.find({user: req.uid}).countDocuments()
        
    
        const favoritesPromise = Favorite.find({user: req.uid})
            .populate({path:'recipe', populate: [ {path:'user'} ]})
            .skip(skip)
            .limit(ITEM_PER_PAGE)
            .sort({[sortBy.toString()]: (sortOrder==='asc')?1:-1})
        
        const [count, favorites] = await Promise.all([countPromise, favoritesPromise])
        const pageCount = count / ITEM_PER_PAGE
            
        const recipes = []
        
        favorites.map( favorite => (
            recipes.push(favorite.recipe)
        ))

        if (sortBy === 'createdAt') {
            recipes.sort((a: IRecipe , b: IRecipe) => {
                if (sortOrder === 'desc') {
                    return b.createdAt.getTime() - a.createdAt.getTime()                    
                } else {
                    return a.createdAt.getTime() - b.createdAt.getTime()
                }
            })            
        } else {
            recipes.sort((a: IRecipe , b: IRecipe) => {
                if (sortOrder === 'desc') {
                    return b.rating - a.rating                    
                } else {
                    return a.rating - b.rating 
                }
            })          
        }

        res.json({
            ok: true,
            recipes,
            pagination:{
                count,
                pageCount
            }
        })   

    } catch (error) {

        res.status(400).json({
            ok: false,
            msg:'Error al traer favoritos'
        })        
    }
    
}

export const updateRating = async (req: RecipeRequest, res: Response) => {
    
    const recipeId = req.params.id;         
    const averageFixed = Number(req.body.newAverage.toFixed(2))

    try {

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({
                ok: false,
                msg: 'Receta con ese id no existe'
            });
        } 

        const updatedRecipe = await Recipe.findByIdAndUpdate( recipe.id, { rating: averageFixed }, { new: true } );

        res.json({
            ok: true,
            updatedRecipe
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}