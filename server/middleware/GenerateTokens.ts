import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateAccessToken = async (req: Request, res: Response, userId: String, email: String) => {
    return jwt.sign({userId, email}, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' })
}