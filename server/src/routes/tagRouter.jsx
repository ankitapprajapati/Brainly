import express from "express"
import {getAllTag} from "../controllers/Tag"

export const tagRouter = express.Router()

tagRouter.get("/getTag",getAllTag)
