const { handelCreateUser, handelGetUsers, handelDeleteUser, handelUpdateUser, handelGetUser, handlePasswordChange } = require("../controller/userController")
const { isLoggedIn, isAdmin } = require("../middleware/auth")
const { runValidation } = require("../validator")
const { registerValidate } = require("../validator/registerValidate")

const userRouter = require("express").Router()

userRouter.get("/",isLoggedIn,isAdmin, handelGetUsers)
userRouter.get("/:id", handelGetUser)
userRouter.post("/register", registerValidate, runValidation, handelCreateUser)
userRouter.delete('/:id', isLoggedIn,isAdmin, handelDeleteUser)
userRouter.put('/:id', isLoggedIn, handelUpdateUser)
userRouter.put('/update-password/:id', handlePasswordChange)


module.exports = userRouter