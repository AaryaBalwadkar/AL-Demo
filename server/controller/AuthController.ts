import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response): Promise<any> => {
    const { email, password, confirmPassword, role } = req.body;

    try {
        if (!email || !role || !password || !confirmPassword) {
            console.log("All Fields are required");
            return res.status(403).json({ message: "All Fields are required" });
        }

        const userAlreadyExists = await prisma.user.findUnique({
            where: { email },
        });
        if (userAlreadyExists) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }

        if (!emailPattern.test(email)) {
            console.log("Invalid Email");
            return res.status(403).json({ message: "Invalid Email" });
        }
        if (
            !passwordPattern.test(password) ||
            !passwordPattern.test(confirmPassword)
        ) {
            console.log(
                "Password should be 6 to 20 characters long with atleast 1 numeric, 1 lowercase and 1 uppercase letter"
            );
            return res
                .status(403)
                .json({
                    message:
                        "Password should be 6 to 20 characters long with atleast 1 numeric, 1 lowercase and 1 uppercase letter",
                });
        }
        if (password != confirmPassword) {
            console.log("Password and Confirm Password should be same");
            return res
                .status(403)
                .json({ message: "Password and Confirm Password should be same" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                role,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            newUser,
        });
        console.log("User created successfully");
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            console.log("All Fields are required");
            return res.status(403).json({ message: "All Fields are required" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "No user found" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ success: false, message: "Incorrect Password" });
        }

        res.status(201).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user,
                password: undefined,
            },
        });
        console.log("Logged in successfully");
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
