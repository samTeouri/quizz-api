import express, { Application } from 'express';
import questionRouter from './routes/questions';

export const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/questions', questionRouter);

