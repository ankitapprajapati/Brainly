import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    title : { type : String, unique:true, required:true }
})

export const Tag = mongoose.model("tags",tagSchema)