import User from "../models/user.js";
import {errorHandler} from "../utils/error.js";
import bcryptjs from "bcryptjs";
import {getAccessRole} from "../utils/getAccessRole.js";

const DEFAULT_PASSWORD = "12345";

export const getUsersByRole = async (req, res, next) => {
    try {
        // Find users created by specific id;
        const users = await User.find({ createdBy: req.user.userId });
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params?.id);
        if (!user) {
            return res.status(404).json({ error: 'User is not defined'})
        }
        const { password, ...rest } = user._doc;
        res.json(rest);
    } catch (error) {
        next(error);
    }
};

// Update a customer or a dealer
export const updateUser = async (req, res, next) => {

    if ( req.user.userId === req.params.id ) return next(errorHandler(403, "You can not update your own account!"));

    const { username, email } = req.body;

    const { userId } = req.user;

    try {
        const updatedUser = await User.findOneAndUpdate({
            _id: req.params.id,
            createdBy: userId // Each dealer or admin can update only customers/dealers that it created.
        }, {
            $set: {
                username,
                email
            }
        }, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation on the updates
        });

        if (!updatedUser) return next(errorHandler(403, "You can not update this account!"));

        const { password, ...rest } = updatedUser._doc;

        return res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    const { username, email } = req.body;
    const { role } = req.user

    if (!role) return next(errorHandler(500, "You must have a role"));

    // For simplicity, each created dealer and customer can have the password “12345”
    const hashedPassword = await bcryptjs.hash(DEFAULT_PASSWORD, 10);

    // Admins can create dealers, dealers can create customers
    const accessRole = getAccessRole(role);

    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: accessRole,
            createdBy: req.user.userId
        });

        await newUser.save();

        const { password, ...rest } = newUser._doc;

        return res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

// Update a customer or a dealer
export const deleteUser = async (req, res, next) => {

    if ( req.user.userId === req.params.id ) return next(errorHandler(403, "You can not delete your own account!"));

    const { userId } = req.user;

    try {
        const deleted = await User.findOneAndDelete({
            _id: req.params.id,
            createdBy: userId // Each dealer or admin can delete only customers/dealers that it created.
        });

        if (!deleted) return next(errorHandler(403, "You can not delete this account!"));

        res.status(200).json({ message: "User has been deleted!" });
    } catch (error) {
        next(error);
    }
}
