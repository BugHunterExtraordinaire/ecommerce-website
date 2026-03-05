import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import handleError from './middleware/handleError';

type StartFunction = () => Promise<void>;

dotenv.config({
  quiet: true
});

const app: Express = express();

app.use(helmet());
app.use(cors());

const port: string = process.env.PORT || '3000';

app.use(handleError);

const start: StartFunction = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, (): void => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    
  }
}

start();