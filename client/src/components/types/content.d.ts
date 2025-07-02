import { Tag } from "./tag";


export interface Content{
    _id : string,
    title : string,
    link : string,
    type : string,
    description : string,
    tags : Tag[],
    userId : string
}