async function errorHandler(error, req, res, next) {
    console.log(error)
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
        case "ValidationErrorItem":
            let message = error.errors.map(el => el.message)
            res.status(400).json({
                message: message[0]
            })
            break;
        case "INPUT_NOT_VALID":
            res.status(400).json({
                message: "Invalid input: Please check your data and try again"
            })
            break;
        case "EMAIL_REQUIRED":
            res.status(400).json({
                message: "Invalid input: Please check your email and try again"
            })
            break;
        case "PASSWORD_REQUIRED":
            res.status(400).json({
                message: "Invalid input: Please check your password and try again"
            })
            break;
        case "AUTH_NOT_VALID":
            res.status(401).json({
                message: "Invalid email or password. Please try again"
            })
            break;
        case "JsonWebTokenError":
            res.status(401).json({
                message: "Invalid token: Please log in again"
            })
            break;
        case "UNAUTHORIZED":
            res.status(401).json({
                message: "Access denied: Please log in first"
            })
            break;
        case "FORBIDDEN":
            res.status(403).json({
                message: "Access denied: You do not have permission to access this resource"
            })
            break;
        case "ITEM_NOT_FOUND":
            res.status(404).json({
                message: "Error 404: Item not found"
            })
            break;
        case "IMGURL_NOT_VALID":
            res.status(400).json({
                message: "Image is required, try again"
            })
            break;
        default:
            res.status(500).json({
                message: "Internal Server Error"
            })
            break;
    }
}

module.exports = errorHandler