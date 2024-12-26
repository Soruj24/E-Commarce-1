const { handelCreateUser, handelGetUsers, handelDeleteUser, handelUpdateUser, handelGetUser, handlePasswordChange } = require("../controller/userController")
const { runValidation } = require("../validator")
const { registerValidate } = require("../validator/registerValidate")

const userRouter = require("express").Router()

userRouter.get("/", handelGetUsers)
userRouter.get("/:id", handelGetUser)
userRouter.post("/register", registerValidate, runValidation, handelCreateUser)
userRouter.delete('/:id', handelDeleteUser)
userRouter.put('/:id', handelUpdateUser)
userRouter.put('/update-password/:id', handlePasswordChange)


module.exports = userRouter