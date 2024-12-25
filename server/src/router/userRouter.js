const { handelCreateUser, handelGetUsers, handelDeleteUser, handelUpdateUser, handelGetUser } = require("../controller/userController")
const { runValidation } = require("../validator")
const { registerValidate } = require("../validator/registerValidate")

const userRouter = require("express").Router()

userRouter.get("/", handelGetUsers)
userRouter.get("/:id", handelGetUser)
userRouter.post("/register", registerValidate, runValidation, handelCreateUser)
userRouter.delete('/:id', handelDeleteUser)
userRouter.put('/:id', handelUpdateUser)


module.exports = userRouter