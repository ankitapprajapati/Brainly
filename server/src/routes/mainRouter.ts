import express from "express";
import { userRouter } from "./userRouter";
import { contentRouter } from "./contentRouter";
import { authMiddleware } from "../middleware/authMiddleware";

export const mainRouter = express.Router()

mainRouter.use('/user',userRouter)
mainRouter.use('/content',authMiddleware,contentRouter)
