import express from 'express'
import { createContent, deleteContent, editContent, getAllContent } from '../controllers/Content'

export const contentRouter = express.Router()

contentRouter.get('/getAllContent',getAllContent);
contentRouter.post("/createContent", createContent)
contentRouter.put( "/editContent",editContent);
contentRouter.delete("/deleteContent",deleteContent);