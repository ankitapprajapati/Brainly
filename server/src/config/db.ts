require('dotenv').config();
import mongoose from "mongoose";

const mongo_url = process.env.MONGO_URL

export const connectToDB =async ()=>{
    if( mongo_url){
        await mongoose.connect(mongo_url)
            .then( ()=>{
                console.log( 'db connect succesfully ')
            })
            .catch((e:Error)=>{
                console.log("Error connecting to mongodb "+ e)
                process.exit(1)
            })
    }
    else{
        console.log("mongo connection url not found ")
    }
}

