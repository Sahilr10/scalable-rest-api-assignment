import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { User } from "../models/user.model.js";


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password -refreshToken');
    return res
    .status(200)
    .json(new ApiResponse(200, users, 'Users fetched successfully'))
})

const updateUserRole = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    if (!['user', 'admin'].includes(role)) {
        throw new ApiError(400, "Invalid role");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.role = role;
    await user.save();

    return res
    .status(200)
    .json(new ApiResponse(200, user, 'User role updated successfully'))
})

const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user._id.toString() === req.user._id.toString()) {
        throw new ApiError(400, "Cannot delete yourself");
    }

    await user.deleteOne();

    return res
    .status(200)
    .json(new ApiResponse(200, {}, 'User deleted successfully'))
})

export {
    getAllUsers,
    updateUserRole,
    deleteUser
}