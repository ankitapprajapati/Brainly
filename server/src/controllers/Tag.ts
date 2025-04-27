import { Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import { Tag } from "../models/Tag";


export const createTag = async ( req:AuthenticatedRequest, res:Response)=>{
    try{
        const {title} = req.body
        const tag = await Tag.create({title})
        res.status(200).json({
            success : true,
            message : "Tag created",
            data  : tag
        })
    }
    catch(e){
        console.log("Error while creating tag : ",e);
        res.status(501).json({
            message : "Internal server Error"
        })
    }
}

export const getAllTags = async ( req:AuthenticatedRequest, res:Response)=>{
    try{
        const tags = await Tag.find({});

        res.status(200).json({
            success : true,
            tags : tags
        })
    }
    catch(e){
        console.log("Error while getting tags : ",e);
        res.status(501).json({
            message : "Internal server Error"
        })
    }
}