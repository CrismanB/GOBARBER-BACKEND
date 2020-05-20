import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import uploadConfig from './config/upload';

import AppError from './errors/appError';

import './database';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'internal server error.',
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 server started on port 3333');
});
