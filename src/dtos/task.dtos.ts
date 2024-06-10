import { TaskStatus } from '../types/TaskStatus';

export interface CreateTaskDto {
    title: string;
    description?: string;
}

export interface UpdateTaskDto {
    id: number;
    title?: string;
    description?: string;
    status?: TaskStatus;
}
