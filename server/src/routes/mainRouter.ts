import express from "express";
import { userRouter } from "./userRouter";
import { contentRouter } from "./contentRouter";
import { authMiddleware } from "../middleware/authMiddleware";
import { brainRouter } from "./brainRouter";
import { tagRouter } from "./tagRouter";

export const mainRouter = express.Router()

mainRouter.use('/user',userRouter)
mainRouter.use('/content',authMiddleware,contentRouter)
mainRouter.use("/brain",authMiddleware,brainRouter)
mainRouter.use("/tag",authMiddleware,tagRouter)
