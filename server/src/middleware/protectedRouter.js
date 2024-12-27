const { jwtAccessKey } = require("../secret");
const jwt = require('jsonwebtoken');


const protectedRouter = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({
                message: "Access token not found"
            })
        }

        const decoded = jwt.verify(accessToken, jwtAccessKey);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid access token"
            })
        }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = { protectedRouter }