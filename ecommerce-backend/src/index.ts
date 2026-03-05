import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

type StartFunction = () => Promise<void>;

dotenv.config({
  quiet: true
});

const app: Express = express();

app.use(helmet());
app.use(cors());

const port: string = process.env.PORT || '3000';

const start: StartFunction = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (): void => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    
  }
}

start();