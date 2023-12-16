import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from '../models/User'
import { IUser } from '../models/User'
import { validationResult } from 'express-validator/src/validation-result'
import { IUserRequest } from '../middlewares/jwt-validators'
import Category from '../models/Category'


export const createCategory = async (req: Request, res: Response) => {

    const category = new Category(req.body)

    try {        
        const categorySaved = await category.save()
        
        res.json({
            ok:true,
            categorySaved
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Error al crear categoria'
        })
    }        
}

export const updateCategory = async (req: Request, res: Response) => {
    
    const categoryId = req.params.id;

    try {

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria con ese id no existe'
            });
        }

        const newCategory = {
            ...req.body,
        }

        const updatedCategory = await Category.findByIdAndUpdate( category.id, newCategory, { new: true } );

        res.json({
            ok: true,
            recipe: updatedCategory
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

export const getCategories = async (req: Request, res: Response) => {

    try {
        const categories = await Category.find()    
            res.json({
                ok: true,
                categories
            })        
    } catch (error) {

        res.status(400).json({
            ok: false,
            msg:'Error al traer categorias'
        })        
    }
    
}


