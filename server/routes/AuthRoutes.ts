import express, { Request, Response, NextFunction } from 'express';
import { signup, login, refreshToken, logout } from '../controller/AuthController';
import { authenticateToken } from '../middleware/AuthMiddleware'

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/refresh-token", refreshToken)

router.delete("/logout", authenticateToken, logout);

router.post("/refresh-token", async (req: Request, res: Response) => {
    res.send('Refresh token route')
});

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: (req as any).user });
})

export default router;