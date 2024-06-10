import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database connected and synced.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
