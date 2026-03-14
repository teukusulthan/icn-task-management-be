import { Request, Response } from "express";
import { prisma } from "../connections/client";
import { hashPassword } from "../utils/password";
import { createUserSchema } from "../validators/user.validator";

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = createUserSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await hashPassword(validatedData.password);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid request",
      error,
    });
  }
};

export const getUsers = (req: Request, res: Response) => {};
export const getUserById = (req: Request, res: Response) => {};
export const updateUser = (req: Request, res: Response) => {};
export const deleteUser = (req: Request, res: Response) => {};
export const loginUser = (req: Request, res: Response) => {};
export const getUserTasks = (req: Request, res: Response) => {};
