import { Mongoose } from "mongoose";

export type ConnectFunction = (url: string) => Promise<Mongoose>;