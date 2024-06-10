import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dtos';
import Task from '../models/task';
import { TaskStatus } from '../types/TaskStatus';

export const createTask = async (createTaskDto: CreateTaskDto) => {
    return await Task.create(
        {
            ... createTaskDto,
            status: TaskStatus.IN_PROGRESS
        }
    );
};

export const getTasks = async () => {
    return await Task.findAll();
};

export const getTaskById = async (id: number) => {
    return await Task.findByPk(id);
};

export const updateTask = async (id: number, updateTaskDto: UpdateTaskDto) => {
    const task = await Task.findByPk(id);
    if (task) {
        await task.update(updateTaskDto);
        return task;
    }
    return null;
};

export const deleteTask = async (id: number) => {
    const task = await Task.findByPk(id);
    if (task) {
        await task.destroy();
        return true;
    }
    return false;
};
