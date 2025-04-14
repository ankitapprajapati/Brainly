import exrpess from 'express';
import { signIn, signUp } from '../controllers/Auth';

export const userRouter = exrpess.Router();

userRouter.post("/signup",signUp);
userRouter.post("/signIn",signIn)

