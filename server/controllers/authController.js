const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {User, Cuisine, Category} = require('../models')

class authController {
    static async addUser(req, res, next){
        try {
            const {username, email, password, phoneNumber, address} = req.body
            const newUser = await User.create({username, email, password, phoneNumber, address})
            const data = await User.findByPk(newUser.id, {
                attributes: {
                    exclude: 'password'
                }
            })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next){
        try {
            const {email, password} = req.body;

            if (!email) {
                throw { name: 'EMAIL_REQUIRED' };
            }
            if (!password) {
                throw { name: 'PASSWORD_REQUIRED' };
            }

            const user = await User.findOne({ where: { email } });
            
            if (!user) {
                throw { name: 'AUTH_NOT_VALID' };
            }
            const isPasswordValid = comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw { name: 'AUTH_NOT_VALID' };
            }
            const access_token = signToken({ 
                id: user.id,
                role: user.role
             });
            res.status(200).json({ access_token });
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = authController