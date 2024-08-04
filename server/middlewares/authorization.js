const {Cuisine} = require('../models')


async function authorization(req, res, next) {
    try {
        const checkAuthorId = await Cuisine.findByPk(req.params.cuisineId)
        if(!checkAuthorId){
            throw {name: "ITEM_NOT_FOUND"}
        }
        if(req.user.role === 'Admin') {
            next()
        } else if(req.user.id === checkAuthorId.authorId) {
            next()
        } else {
            throw {name: "FORBIDDEN"}
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization