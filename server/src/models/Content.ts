
import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title : { type : String, required : true },
    type  : { type : String, required: true , enum : [ "image", "video", "article", "music","youtube","twitter","link"] },
    description : { type : String },
    link : { type : String, required : true },
    tags : [ { type : mongoose.Schema.Types.ObjectId, ref : "tags" }  ],
    userId : { type : mongoose.Schema.Types.ObjectId, ref: "users", required:true}
    
})

export const Content = mongoose.model("contents",contentSchema)