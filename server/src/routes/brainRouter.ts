import express from "express"
import { checkStatus, createLink, shareLink} from "../controllers/Brain"

export const brainRouter = express.Router()

brainRouter.post("/share",createLink);
brainRouter.get("/status",checkStatus);
brainRouter.get("/:shareLink",shareLink);
