import express from "express";
import jwtAuth from "../../middlewares/jwt-auth.routes";
import userRoutes from "./users.route";
import uptimeRoutes from "./uptime.route";
import authRoutes from "./auth.route";
import bookmarkRoutes from "./bookmark.route";

const router = express.Router();

router.use("/uptime", uptimeRoutes); // <-- public routes
router.use("/auth", authRoutes);
router.use("/users", jwtAuth, userRoutes); // <-- private routes
router.use("/bookmarks", jwtAuth, bookmarkRoutes); // <-- private routes

export default router;
