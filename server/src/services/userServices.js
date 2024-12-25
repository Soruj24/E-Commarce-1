const { default: mongoose } = require("mongoose");
const User = require("../model/userModel");
const createError = require('http-errors')

const findUser = async (id) => {
    try {

        const user = await User.findById(id);
        if (!user) {
            throw createError(404, "User not found");
        }
        return user

    } catch (error) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createError(400, "Invalid user ID");
        }
    }
}

const deleteUser = async (id) => {

    const userDelete = await User.findByIdAndDelete(id);
    if (!userDelete) {
        throw createError(404, "User not deleted");
    }
    return userDelete


}

const updateUser = async (id, updates, updateOptions) => {

    const userUpdate = await User.findByIdAndUpdate(id, updates, updateOptions)
    if (!userUpdate) throw createError(404, "User not update");

    return userUpdate


}

const createUser = async (name, email, password) => {

    const userExits = await User.findOne({ email });

    if (userExits) {
        throw createError(400, "user already exist")
    }

    const users = await User.create({
        name,
        email,
        password
    })

    return users


}


module.exports = {
    findUser,
    deleteUser,
    updateUser,
    createUser,

}