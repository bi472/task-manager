import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../config/database';
import { TaskStatus } from '../types/TaskStatus';

interface TaskAttributes {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'status'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public id!: string;
    public title!: string;
    public description?: string;
    public status!: TaskStatus;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Task.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: [3, 128],
        },
    },
    description: {
        type: new DataTypes.STRING(256),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(TaskStatus)),
        defaultValue: TaskStatus.IN_PROGRESS,
    },
}, {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
});

export default Task;
