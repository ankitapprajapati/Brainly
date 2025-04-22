import mongoose from "mongoose"; 

const UserSchema = new mongoose.Schema({
    firstname : { type : String, requied : true },
    lastname : { type : String, required : false },
    username : { type : String, required : true, unique :true },
    password : { type : String, required : true},
})

export const User = mongoose.model( "users",UserSchema)