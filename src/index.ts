import { json } from 'body-parser';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/tasks', taskRoutes);
app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
