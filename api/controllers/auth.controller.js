import User from "../models/user.js";
import {errorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            createdBy: req.user && req.user.role === 'dealer' ? req.user.userId : null, // For customers created by dealers
        });

        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const validUser = await User.findOne({ username });
        if (!validUser) return next(errorHandler(401, "Wrong credentials!"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

        // Create a JWT payload with user ID and role
        const payload = {
            userId: validUser._id,
            role: validUser.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        const { password: pass, ...secureUser} = validUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
            .status(200)
            .json(secureUser);
    } catch (error) {
        next(error);
    }
}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("User has been logged out!");
    } catch (error) {
        next(error)
    }
}