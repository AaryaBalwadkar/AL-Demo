import express, { Request, Response, NextFunction } from 'express';
import { signup, login } from '../controller/AuthController';

const router = express.Router();

// router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.delete("/logout", async (req: Request, res: Response) => {
    res.send('Logout route')
});

router.post("/refresh-token", async (req: Request, res: Response) => {
    res.send('Refresh token route')
});

// router.post("/verify-email", verifyEmail);
// router.post("/forgot-password", forgotPassword);

// router.post("/reset-password/:token", resetPassword);

export default router;