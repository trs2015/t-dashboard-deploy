import mongoose from "mongoose";

// Define roles
export const roles = {
    OWNER: 'owner',
    DEALER: 'dealer',
    CUSTOMER: 'customer'
};

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [roles.OWNER, roles.DEALER, roles.CUSTOMER],
        default: roles.CUSTOMER
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } // Only for customers created by a dealer or dealers created by an admin

}, { timestamps: true} );

const User = mongoose.model("User", UserSchema);

export default User;