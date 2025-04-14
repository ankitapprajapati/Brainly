
import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title : { type : String, required : true },
    type  : { type : String, required: true , enum : [ "image", "video", "article", "music","youtube","twitter","link"] },
    description : { type : String },
    link : { type : String },
    // tags : [ { type : mongoose.Types.ObjectId, ref : "Tag" }  ],
    userId : { type : mongoose.Types.ObjectId, ref: "User", required:true}
    
})

export const Content = mongoose.model("contents",contentSchema)