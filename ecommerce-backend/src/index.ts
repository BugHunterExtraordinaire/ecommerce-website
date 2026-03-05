import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import handleError from './middleware/handleError';
import { default as userRouter } from './routers/user';
import { default as productRouter } from './routers/product';
import { default as cartRouter } from './routers/cart';

type StartFunction = () => Promise<void>;

dotenv.config({
  quiet: true
});

const app: Express = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/aoi/v1/cart', cartRouter)

app.use(handleError);

const port: string = process.env.PORT || '3000';

const start: StartFunction = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, (): void => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    
  }
}

start();