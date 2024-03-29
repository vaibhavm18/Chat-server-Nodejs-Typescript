import express from "express";
import { getAllNotificationController } from "../controller/user.controller.js";
import { authenticateUser, logout } from "../controller/auth.controller.js";

export const userRoute = express.Router();

// should be users
userRoute.get("/profile", authenticateUser);
userRoute.get("/notification", getAllNotificationController);
userRoute.post("/logout", logout);

// still need work
// userRoute.delete("/delete", deleteUser);
// userRoute.put("/update", updateProfile);
