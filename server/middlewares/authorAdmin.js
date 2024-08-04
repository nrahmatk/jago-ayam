async function authorAdmin(req, res, next) {
    try {
        console.log(req.user)
        if(req.user.role === 'Admin') {
            next()
        } else {
            throw {name: "FORBIDDEN"}
        }
    } catch (error) {
        // console.log(error)
        next(error)
    }
}

module.exports = authorAdmin