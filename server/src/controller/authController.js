const bcrypt = require("bcryptjs")
const { jwtAccessKey, jwtRefreshKey } = require("../secret")
const { successResponse } = require("./responesController")
const jwt = require('jsonwebtoken');
const { setAccessTokenCookie, setRefreshTokenCookie } = require("../Helper/cookie");
const User = require("../model/userModel");
const { createJSONWebToken } = require("../Helper/jsonwebtoken");

const handelLogIn = async (req, res, next) => {
    try {
        // email.password
        const { email, password } = req.body
        // isExists
        const userExists = await User.findOne({ email })

        if (!userExists) {
            return res.status(404).json({
                message: "User dose not exist with this email"
            })
        }

        // compare the password
        const isMatch = await bcrypt.compare(password, userExists.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Password does not match"
            })
        }

        const accessToken = createJSONWebToken({ userExists },
            jwtAccessKey,
            "5m")
        const refreshToken = createJSONWebToken({ userExists },
            jwtRefreshKey,
            "7d")

        setAccessTokenCookie(res, accessToken)
        setRefreshTokenCookie(res, refreshToken)
        const user = userExists.toObject();
        delete user.password;

        return successResponse(res, {
            statusCode: 201,
            message: "User logged in successfully",
            payload: {
                user: {
                    ...user,
                    accessToken,
                    refreshToken
                }
            },
        });


    } catch (error) {
        next(error)
    }
}
const handelRefreshToken = async (req, res, next) => {
    try {

        const oldRefreshToken = req.cookies.refreshToken;
        if (!oldRefreshToken) {
            return res.status(401).json({
                message: "Refresh token not found"
            })
        }

        const decoded = jwt.verify(oldRefreshToken, jwtRefreshKey);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid refresh token"
            })
        }

        const accessToken = createJSONWebToken({ userExists: decoded.userExists },
            jwtAccessKey,
            "15m")

        setAccessTokenCookie(res, accessToken)




        return successResponse(res, {
            statusCode: 201,
            message: "new access token created successfully",
            payload: {
                accessToken
            },
        });


    } catch (error) {
        next(error)
    }
}



const handelProtected = async (req, res, next) => {
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

        const user = await User.find({})

        return successResponse(res, {
            statusCode: 201,
            message: "Protected route accessed successfully",
            payload: { user }


        });

    } catch (error) {
        next(error)
    }
}

const handelLogOut = async (req, res, next) => {
    try {

        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        return successResponse(res, {
            statusCode: 201,
            message: "User logged out successfully",

        });

    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { handelLogIn, handelLogOut, handelRefreshToken, handelProtected }