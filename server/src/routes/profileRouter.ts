import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";

export const profileRouter = express.Router();

profileRouter.use('/',(req,res)=>{
    res.status(200).send({
        message : "you are authenticated !! "
    })
})