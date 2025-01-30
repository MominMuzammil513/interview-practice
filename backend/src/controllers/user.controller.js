import { User } from "../models/user.models.js";
import cookie from "cookie";

// Helper function to send tokens securely
const sendTokenResponse = (user, statusCode, res) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(statusCode).json({
        user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
        accessToken,
    });
};

// Register a new user
export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    try {
        const user = await User.create({ firstName, lastName, email, password });
        sendTokenResponse(user, 201, res);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "All fields are required" });

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Logout user
export const logout = (req, res) => {
    res.cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
};

// Refresh token endpoint
export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(403).json({ message: "Refresh token required" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(403).json({ message: "Invalid refresh token" });

        const accessToken = user.generateAccessToken();
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
};
