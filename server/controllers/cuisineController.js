const { Op, where } = require('sequelize');
const { User, Cuisine, Category } = require('../models')

const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_SECRET, 
});

class cuisineController {
    // public
    static async getCuisinePub(req, res, next){
        try {
            const {filter, sort, page, size, search} = req.query
            const option = {
                where: {},
            }

            if(filter) {
                option.where.categoryId = filter
            
            }

            if (sort) {
                option.order = [
                    ['createdAt', sort]
                ];
            }

            let limit = 10
            let pageNumber = 1

            if(size){
                limit = parseInt(size)
            }
            if(page){
                pageNumber = parseInt(page)
            }
            
            option.limit = limit
            option.offset = limit * (pageNumber - 1)

            if(search) {
                option.where.name = {[Op.iLike] : `%${search}%`}
            }
            


            const {count, rows} = await Cuisine.findAndCountAll(option)
            res.status(200).json({
                page: pageNumber,
                data: rows,
                totalData: count,
                totalPage: Math.ceil(count / limit),
                dataPerPage: limit
            })
        } catch (error) {
            next(error)
        }
    }
    static async getCuisinePubById(req, res, next){
        try {
            const data = await Cuisine.findOne({
                where: {
                    id: req.params.cuisineId
                },
                include: [{
                    model: Category,
                    attributes: ['name']
                }]
            });
            
            if(!data) {
                throw { name: 'ITEM_NOT_FOUND' };
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    // authorization
    static async addCuisine(req, res, next){
        try {
            const userId = req.user.id
            const {name, description, price, imgUrl, categoryId} = req.body

            const newCuisine = await Cuisine.create({name, description, price, imgUrl, categoryId, authorId: userId})
            res.status(201).json(newCuisine);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async getCuisine(req, res, next){
        try {
            console.log(req.user)
            const data = await Cuisine.findAll({
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password']
                        }
                    },
                    {
                        model: Category,
                        attributes: ['name']
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getCuisineById(req, res, next) {
        try {
            const { cuisineId } = req.params;
            const data = await Cuisine.findByPk(cuisineId, {
                include: {
                    model: Category,
                    attributes: ['name']
                }
            });
    
            if (!data) {
                throw { name: 'ITEM_NOT_FOUND' };
            }
    
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    static async editCuisine(req, res, next){
        try {
            const {cuisineId} = req.params
            const {name, description, price, imgUrl, categoryId} = req.body

            
            console.log(name)
            const findCuisine = await Cuisine.findByPk(cuisineId)
            if(!findCuisine) {
                throw { name: 'ITEM_NOT_FOUND' };
            }
            await Cuisine.update({name, description, price, imgUrl, categoryId},{where: { id: cuisineId}})
            const data = await Cuisine.findByPk(cuisineId, {
                include: {
                    model: Category,
                    attributes: ['name']
                }
            });

            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async deleteCuisine(req, res, next){
        try {
            const cuisine = await Cuisine.findByPk(req.params.cuisineId);
            if (!cuisine) {
                throw { name: 'ITEM_NOT_FOUND' };
            }
            await cuisine.destroy();
            res.status(200).json({ message: `${cuisine.name} success to delete` });
        } catch (error) {
            next(error)
        }
    }
    static async uploadImage(req, res, next){
        try {

            const {cuisineId} = req.params

            if(!req.file) {
                throw {name: "IMGURL_NOT_VALID"}
            }

            const encode = req.file.buffer.toString("base64");
            const base64Data = `data:${req.file.mimetype};base64,${encode}`

            let upload = await cloudinary.uploader.upload(base64Data) // error disini
            await Cuisine.update(
                { imgUrl: upload.secure_url },
                { where: { id: cuisineId } }
            );

            const cuisine = await Cuisine.findByPk(cuisineId);
            const entityName = cuisine ? cuisine.name : 'unknown';

            res.status(200).json({
                message: `Image ${entityName} success to update`
            });
        } catch (error) {
            next(error)
        }
    }

    static async getCount(req, res, next){
        try {
            const [userCount, categoryCount, cuisineCount] = await Promise.all([
                User.count(),
                Category.count(),
                Cuisine.count(),
              ]);
        
              res.status(200).json({
                totalUsers: userCount,
                totalCategories: categoryCount,
                totalCuisines: cuisineCount,
              });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = cuisineController