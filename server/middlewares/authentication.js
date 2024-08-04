const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        if(!req.headers.authorization) {
            throw {name: "UNAUTHORIZED"}
        }

        const token = req.headers.authorization.split(' ')[1]
        const payload = verifyToken(token)
        
        const user = await User.findByPk(payload.id)

        if(!user){
            throw {name: "UNAUTHORIZED"}
        }

        req.user = {
            id: user.id,
            role: user.role
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication