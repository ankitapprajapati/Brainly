// d stand for decleration of file 
import { Request } from "express";

export interface AuthenticatedRequest extends Request{
    userId? : string
}