import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { TaskStatus } from '../types/TaskStatus';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 128)
    title!: string;

    @IsOptional()
    @IsString()
    @Length(0, 256)
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @Length(3, 128)
    title?: string;

    @IsOptional()
    @IsString()
    @Length(0, 256)
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}
