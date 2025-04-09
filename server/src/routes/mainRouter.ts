import express from "express";
import { userRouter } from "./userRouter";

export const mainRouter = express.Router()

mainRouter.use('/user',userRouter)
