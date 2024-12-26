const User = require("../model/userModel");
const createError = require('http-errors');
const { successResponse } = require("./responesController");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const { findUser, deleteUser, updateUser, createUser } = require("../services/userServices");
const handelGetUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");

        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
            ],
        };

        const option = { password: 0 };

        const users = await User.find(filter, option)
            .limit(limit)
            .skip((page - 1) * limit);

        const count = await User.find(filter).countDocuments();

        if (!users) throw createError(404, "no users found");

        return successResponse(res, {
            statusCode: 200,
            message: "users were returned Successfully",
            payload: {
                users,
                pagination: {
                    totalPage: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 < Math.ceil(count / limit) ? page + 1 : null,
                },
            },
        });
    } catch (error) {
        next(error);
    }
}

const handelGetUser = async (req, res, next) => {
    try {

        const id = req.params.id;

        const user = await findUser(id)

        return successResponse(res, {
            statusCode: 200,
            message: "Signal user return successfully",
            payload: {
                user,
            },
        });

    } catch (error) {
        next(error)
    }
}

const handelCreateUser = async (req, res, next) => {
    try {

        const { name, email, password } = req.body
        const users = await createUser(name, email, password)

        return successResponse(res, {
            statusCode: 200,
            message: "users create Successfully",
            payload: {
                users,
            },
        });

    } catch (error) {
        next(error)
    }
}

const handelDeleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        await findUser(id)

        const userDelete = await deleteUser(id)

        return successResponse(res, {
            statusCode: 200,
            message: "User deleted successfully",
            payload: {
                userDelete,
            },
        });

    } catch (error) {
        next(error);
    }
};


const handelUpdateUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        await findUser(id)

        const updateOptions = { new: true, runValidation: true, context: 'query' };


        let updates = {}
        for (let key in req.body) {
            if (["name"].includes(key)) {
                updates[key] = req.body[key]
            } else if (["email"].includes(key)) {
                throw createError(400, "You can't update email")
            }
        }


        const userUpdate = await updateUser(id, updates, updateOptions)



        // Return a success response
        return successResponse(res, {
            statusCode: 200,
            message: "User updated successfully",
            payload: { userUpdate },
        });

    } catch (error) {
        next(error);
    }
};


const handlePasswordChange = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { id } = req.params;

        // Validate input
        if (!oldPassword || !newPassword) {
            throw createError(400, "Old password and new password are required.");
        }

        // Find user by ID
        const user = await findUser(id);

        if (!user) {
            throw createError(404, "User not found.");
        }

        // Compare old password with the hashed password in the database
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }

       
        // Update the user's password
        await User.findByIdAndUpdate(id, { password: newPassword }, { new: true });

        // Respond with success
        return successResponse(res, {
            statusCode: 200,
            message: "Password changed successfully.",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handelGetUsers,
    handelGetUser,
    handelCreateUser,
    handelDeleteUser,
    handelUpdateUser,
    handlePasswordChange
}