import express from "express"
import { createTag, getAllTags } from "../controllers/Tag"

export const tagRouter = express.Router()

tagRouter.get("/getTag",getAllTags)
tagRouter.post("/createTag",createTag)

