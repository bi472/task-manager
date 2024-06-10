import Task from '../models/task';

export const createTask = async (title: string, description?: string) => {
    return await Task.create({ title, description });
};

export const getTasks = async () => {
    return await Task.findAll();
};

export const getTaskById = async (id: number) => {
    return await Task.findByPk(id);
};

export const updateTask = async (id: number, title: string, description: string = '', status: string) => {
    const task = await Task.findByPk(id);
    if (task) {
        task.title = title;
        task.description = description;
        task.status = status;
        await task.save();
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
