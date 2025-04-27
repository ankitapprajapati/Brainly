import { Tag } from "../models/Tag";


export const predefinedTags = async()=>{
    const tags = ["Music","Technology","Health","Education","Travel","Finance"];
    for (const tagName of tags) {
        const existingTag = await Tag.findOne({ title: tagName });
        if (!existingTag) {
            await Tag.create({ title: tagName });
        }
    }
}