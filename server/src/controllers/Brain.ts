import { Request, Response } from "express";
import { Link } from "../models/Link";
import { AuthenticatedRequest } from "../types/express";
import { v4 as uuidv4 } from 'uuid';
import { Content } from "../models/Content";


export const createLink = async(req:AuthenticatedRequest,res:Response)=>{
    const share = req.body.share;

    try{
        if( share ){
            const existingLink = await Link.findOne({userId:req.userId});
            if( existingLink ){
                const updatedLink = await Link.findOneAndUpdate(
                    {userId:req.userId},
                    {live:true},
                    {new : true}
                );

                res.status(200).json({
                    message : "Now your brain is public",
                    link : updatedLink?.hash,
                    live : true
                })
                return;
            }

            const hash = uuidv4();
            await Link.create({
                userId : req.userId,
                hash : hash,
                live : true
            })
            res.status(200).json({
                message : "Now your brain is public",
                link : hash,
                live : true
            })
        }else{
            await Link.findOneAndUpdate(
                {userId:req.userId},
                {live : false }
            )
            res.status(200).json({
                message : "Now your brain is private",
                live : false
            })
        }
    }
    catch(e){
        console.log( "Error while updating link : ",e)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const shareLink = async( req:AuthenticatedRequest,res:Response)=>{
    const hash = req.params.shareLink;

    try{
        const link = await Link.findOne({
            hash
        })
        // console.log( "link : ",link)
        if( !link ){
            res.status(411).json({
                message: "Invalid Link",
                success : false
            })
            return;
        }

        if( !link.live ){
            res.status(404).json({
                message : "This brain is private",
                success : false
            })
            return
        }

        const content = await Content.find({ 
            userId:link.userId,
        })
        .populate("userId","username firstname lastname")
        .populate("tags")

        res.status(200).json({
            message : "Brain recieved successfully",
            content : content,
            success : true
        })
    }
    catch(e){
        console.log( "Error while get link : ",e);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const checkStatus = async (req:AuthenticatedRequest,res:Response)=>{
    try{
        const link = await Link.findOne({ userId : req.userId});
        if( !link ) {
            res.status(404).json({
                message : "brain not hosted yet",
                live   : false,
            })
            return ;
        }  
        if (link.live) {
            res.json({
              message: "Your brain is public",
              live: true,
              hash: link.hash,
            });
            return;
        }
        res.json({
            message: "Your brain is private",
            live: false,
        });
        
    }
    catch(e){
        console.log("Error while checking status : ",e)
        res.status(501).json({
            message : "Internal server error"
        })
    }
}