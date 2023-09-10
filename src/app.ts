/* eslint-disable no-console */
import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();
app.use(cors());
import { UserRoutes } from './modules/users/user.route';
import globalErrorHander from './middlewares/gobalerrorhandeler';

//parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes

app.use('/api/v1/user', UserRoutes);

app.use(globalErrorHander);

export default app;
