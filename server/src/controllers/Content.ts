// 
import { Response } from "express";
import { contentSchema, editContentSchema } from "../zod_schema/contentSchema";
import { Content } from "../models/Content";
import { AuthenticatedRequest } from "../types/express";

export const createContent = async (req:AuthenticatedRequest,res:Response):Promise<void> => {
    // zod parse
    const result = contentSchema.safeParse(req.body)
    if( !result.success ){
        res.status(411).json({
            message : result.error.issues[0].message,
            feild : result.error.issues[0].path[0]
        })
        return
    }

    // link and description is optional 
    const {title,link,type,description,tags} = req.body

    try{
        await Content.create({
            title,
            description,
            link,
            type,
            userId : req.userId,
            tags
        })

        const content = await Content.find( {userId:req.userId})

        res.status(200).json({
            message : "content added",
            user : req.userId,
            userContent : content
        })

    }
    catch(e){
        console.log( "Error while creating content : "+e)
        res.status(500).json({
            message :"internal server error"
        })
    }
}

export const deleteContent = async (req:AuthenticatedRequest,res:Response):Promise<void> => {
    try{
        const contentId = req.body.contentId;
        await Content.findOneAndDelete({
            _id : contentId,
            userId : req.userId,
        })   
        
        res.status(200).json({
            message: "Deleted",
        })
    }
    catch(e){
        console.log( "Error while deleting content : "+e)
        res.status(500).json({
            message :"internal server error"
        })
    }
}

export const editContent = async (req:AuthenticatedRequest,res:Response):Promise<void> => {
    try{
        const result = editContentSchema.safeParse(req.body);
        if( !result.success ){
            res.status(411).json({
                message : result.error.issues[0].message,
                feild : result.error.issues[0].path[0]
            })
            return
        }

        const {title,link,type,description,tags,contentId} = req.body

        const content = await Content.findByIdAndUpdate(contentId, {title,type,description,link,tags}, {new:true} )
        
        res.status(200).json({
            message: "Updated succesfully",
            updatedContent : content
        })

    }
    catch(e){
        console.log( "Error while editing content : "+e)
        res.status(500).json({
            message :"internal server error"
        })
    }
}

export const getAllContent = async (req:AuthenticatedRequest,res:Response):Promise<void> => {
    try{
        const content = await Content.find({userId:req.userId}).populate("tags","title").populate("userId","username firstname lastname")
        res.status(200).json({
            content:content,
        })

    }
    catch(e){
        console.log( "Error while getting content : "+e)
        res.status(500).json({
            message :"internal server error"
        })
    }
}