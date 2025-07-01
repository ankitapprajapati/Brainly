import express from 'express'
import cors from 'cors'

import { mainRouter } from './routes/mainRouter';
import { connectToDB } from './config/db';
import { predefinedTags } from './utils/predefinedTag';

require("dotenv").config()
const app = express();
const port = process.env.PORT


connectToDB()
  .then(() => {
    predefinedTags();
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });




app.use( cors() );
app.use( express.json() )
app.use( "/api/v1",mainRouter)

app.get( "/", (req,res)=>{
    res.send("Hello world");
})

app.listen ( port, ()=>{
    console.log( "app is listening : ")
})

