import { NextFunction, Request, Response } from 'express';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dtos';
import { validationMiddleware } from '../middleware/ValidationMiddleware';
import { asyncHandler } from '../middleware/asyncHandler';
import * as taskService from '../services/taskService';

export const createTask = [
    validationMiddleware(CreateTaskDto),
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const createTaskDto: CreateTaskDto = req.body;
        const task = await taskService.createTask(createTaskDto);
        res.status(201).json(task);
    })];

export const getTasks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
});

export const getTaskById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const task = await taskService.getTaskById(Number(id));
    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

export const updateTask = [
    validationMiddleware(UpdateTaskDto),
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const updateTaskDto: UpdateTaskDto = req.body;
        const task = await taskService.updateTask(Number(id), updateTaskDto);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    })];

export const deleteTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const success = await taskService.deleteTask(Number(id));
    if (success) {
        res.status(204).json();
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});
