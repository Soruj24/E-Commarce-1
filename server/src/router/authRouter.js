const { handelLogIn, handelLogOut, handelRefreshToken, handelProtected } = require("../controller/authController");
const { isLoggedOut, isLoggedIn } = require("../middleware/auth");

const authRouter = require("express").Router();

authRouter.post('/login', isLoggedOut, handelLogIn)
authRouter.post('/logout', isLoggedIn, handelLogOut)
authRouter.get('/refresh-token', handelRefreshToken)
authRouter.get('/protected', handelProtected)



module.exports = authRouter