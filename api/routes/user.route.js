import express from "express";
import {protect} from "../middlewares/protect.js";
import {authorize} from "../middlewares/authorize.js";
import {roles} from "../models/user.js";
import {
    createUser,
    deleteUser, getUserById, getUsersByRole,
    updateUser
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protect, authorize(roles.OWNER, roles.DEALER), getUsersByRole);

router.get("/:id", protect, authorize(roles.OWNER, roles.DEALER), getUserById);

router.post("/", protect, authorize(roles.OWNER, roles.DEALER), createUser);

router.put("/:id", protect, authorize(roles.OWNER, roles.DEALER), updateUser);

router.delete("/:id", protect, authorize(roles.OWNER, roles.DEALER), deleteUser);

export default router;