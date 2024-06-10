import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { TaskStatus } from '../types/TaskStatus';

class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: TaskStatus;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Task.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
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
        type: DataTypes.ENUM(...Object.keys(TaskStatus)),
        defaultValue: TaskStatus.IN_PROGRESS,
    },
}, {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
});

export default Task;
