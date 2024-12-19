import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const access_Secret = process.env.ACCESS_TOKEN_SECRET || '';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token required' });
        return; // Ensure the function ends here
    }

    jwt.verify(token, access_Secret, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return; // Ensure the function ends here
        }

        (req as any).user = user; // Attach user to request object
        next(); // Call next() to pass control to the next middleware/handler
    });
};
