import { NextFunction, Response,Request } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { AuthenticatedRequest } from "../types/express";

require("dotenv").config

if( !process.env.JWT_SECRET ){
    throw new Error( "JWT_SECRET is not defined in environmental variable");
}
const jwt_secret = process.env.JWT_SECRET;


export const authMiddleware = async ( req:AuthenticatedRequest, res:Response, next : NextFunction ) : Promise<void> =>{
    try{
        const authHeader = req.headers.authorization
        if( !authHeader || !authHeader.startsWith("Bearer ")){
            res.status(401).json({
                message : "Auth token is missing"
            })
            return
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify( token,jwt_secret) as JwtPayload
        if( decoded.userId ){
            req.userId = decoded.userId;
            next();
        }
        else{
            res.status(401).json({
                message : "unauthorised access"
            })
        }
    }
    catch(e){
        console.log("Error in auth middleware : "+ e)
        res.status(403).json({
            message: "internal server error",
        })
    }
}