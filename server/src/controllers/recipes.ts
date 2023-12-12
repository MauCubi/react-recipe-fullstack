import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import {Types, isValidObjectId} from 'mongoose'


interface RecipeRequest extends Request {
    uid: Types.ObjectId
}

export const getRecipe = async (req: RecipeRequest, res: Response) => {

    const recipeId = req.params.id
    
    if (isValidObjectId(recipeId)) {
        
        try {
            const recipe = await Recipe.findById(recipeId).populate('user')
                    
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
    const recipes = await Recipe.find().populate('user', ['name', 'email']) 

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
            recipe: updatedRecipe
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

        await Recipe.findByIdAndDelete( recipe.id );

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