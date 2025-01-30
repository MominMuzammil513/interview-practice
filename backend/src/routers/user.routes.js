import { Router } from "express";
import { register, login, logout, refreshAccessToken } from "../controllers/user.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);
router.get("/profile", protect, (req, res) => res.json(req.user));

export default router;
