import {z} from "zod"

const VALUES = [ "image", "video", "article", "music", "youtube", "twitter", "link" ] as const

export const contentSchema = z.object({
    title : z.string(),
    type  : z.enum(VALUES),
    description : z.string().optional(),
    link : z.string().optional(),
    tags : z.array(z.string()),
})

export const editContentSchema = contentSchema.extend({
    contentId : z.string()
})