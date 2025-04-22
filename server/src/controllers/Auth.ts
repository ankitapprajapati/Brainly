require('dotenv').config()
import exrpess,{Request,Response} from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sigininSchema } from '../zod_schema/signinSchema';
import { siginupSchema } from '../zod_schema/signupSchema';

const jwt_secret = process.env.JWT_SECRET;
if( !jwt_secret ){
    console.log( "jwt secret key is missing ");
    throw new Error ( "JWT secrect is not found");
}

// generate-token 
const generateToken = (userId:string):string=>{
    const token  = jwt.sign(
        { userId },
        jwt_secret,
        { expiresIn:'24h' }
    )
    return token;
}

export const signUp =  async ( req:Request,res:Response) : Promise<void>=>{

    const result = siginupSchema.safeParse(req.body);
    if( !result.success ){
        res.status(411).json({
            message : result.error.issues[0].message,
            feild : result.error.issues[0].path[0]
        })
        return
    }

    let { firstname,lastname,username,password } = req.body;

    try{
        const isUserExist = await User.findOne({username})
        if( isUserExist ){
            res.status(403).json({
                message : "username already taken "
            })
            return;
        }

        const hashedPassword = await bcrypt.hash( password,10)
        
        const user = await User.create({
            firstname:firstname,
            lastname:lastname,
            username:username,
            password:hashedPassword
        })

        const userId = user._id.toString();
        const token = generateToken(userId);

        res.status(200).json({
            message:"signed up",
            token : token
        })
    }
    catch(e:any){
        console.log( "error while signing up " + e);
        res.status(500).json({
            message : "server error "
        })
    }       
}

export const signIn =  async ( req:Request,res:Response) : Promise<void>=>{

    const result = sigininSchema.safeParse(req.body);
    if( !result.success ){
        res.status(400).json({
            message : result.error.issues[0].message,
            feild   : result.error.issues[0].path[0],            
        })
        return;
    }

    const { username,password } = req.body;

    try{
        const user = await User.findOne({username})
        if( !user ){
            res.status(403).json({
                message : "wrong username",
            })
            return
        }

        const isCorrectPassword = await bcrypt.compare(password,user.password)

        if( !isCorrectPassword ) {
            res.status( 403).json({
                message : "wrong password"
            })
            return ;
        }

        const userId = user._id.toString();
        const token = generateToken(userId);

        res.status(200).json({
            message: "sign in successfully",
            token : token
        })
    }
    catch(e:any){
        console.log( "error while signin "+e),
        res.status(500).json({
            message :"internal server error"
        })
    }
}

