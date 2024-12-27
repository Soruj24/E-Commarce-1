const { handelCreateUser, handelGetUsers, handelDeleteUser, handelUpdateUser, handelGetUser, handlePasswordChange } = require("../controller/userController")
const { isLoggedIn, isAdmin } = require("../middleware/auth")
const { protectedRouter } = require("../middleware/protectedRouter")
const { runValidation } = require("../validator")
const { registerValidate } = require("../validator/registerValidate")

const userRouter = require("express").Router()

userRouter.get("/",isLoggedIn,isAdmin,protectedRouter, handelGetUsers)
userRouter.get("/:id",isLoggedIn,isAdmin,protectedRouter,  handelGetUser)
userRouter.post("/register", registerValidate, runValidation, handelCreateUser)
userRouter.delete('/:id', isLoggedIn,isAdmin,protectedRouter, handelDeleteUser)
userRouter.put('/:id', isLoggedIn,protectedRouter, handelUpdateUser)
userRouter.put('/update-password/:id',isLoggedIn,protectedRouter, handlePasswordChange)


module.exports = userRouter