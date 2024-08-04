const {User, Cuisine, Category} = require('../models')

class categoryController {
    static async addCategory(req, res, next){
        try {
            const {name} = req.body
            const newCategory = await Category.create({ name });
            res.status(201).json(newCategory);
        } catch (error) {
            next(error)
        }
    }
    static async getCategory(req, res, next){
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error) {
            next(error)
        }
    }
    static async getCategoryById(req, res, next){
        try {
            const category = await Category.findByPk(req.params.categoryId);
            if (!category) {
                throw { name: 'ITEM_NOT_FOUND' };
            }
            res.status(200).json(category);
        } catch (error) {
            next(error)
        }
    }
    static async editCategory(req, res, next){
        try {
            const {name} = req.body;
            const category = await Category.findByPk(req.params.categoryId);
            if (!category) {
                throw { name: 'ITEM_NOT_FOUND' };
            }
            await category.update({ name });
            res.status(200).json(category);
        } catch (error) {
            next(error)
        }
    }
    static async deleteCategory(req, res, next){
        try {
            const category = await Category.findByPk(req.params.categoryId);
            if (!category) {
                throw { name: 'ITEM_NOT_FOUND' };
            }
            await category.destroy();
            res.status(200).json({ message: `${category.name} has been deleted` });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = categoryController