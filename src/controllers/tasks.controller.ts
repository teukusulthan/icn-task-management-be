import { Request, Response } from "express";
import { prisma } from "../connections/client";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator";
import { ZodError } from "zod";

export const createTask = async (req: Request, res: Response) => {
  try {
    const validatedData = createTaskSchema.parse(req.body);
    const userId = (req as any).user.id as string;

    const task = await prisma.task.create({
      data: {
        ...validatedData,
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();

    return res.json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id as string;

    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    return res.json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const validatedData = updateTaskSchema.parse(req.body);

    const task = await prisma.task.update({
      where: { id },
      data: validatedData,
    });

    return res.json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await prisma.task.delete({
      where: { id },
    });

    return res.json({
      success: true,
      message: "Task deleted successfully",
      data: null,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
