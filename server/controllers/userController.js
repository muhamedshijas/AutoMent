import UserModel from '../models/UserModel.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

var salt=bcrypt.genSaltSync(10);

export async function userSignup(req,res){
    try{
        const {name,email,password,mobileNo}=req.body;
        const hashPassword=bcrypt.hashSync(password,salt)
        const user=await UserModel.findOne({email});
        if(user){
            return res.json({error:true,message:"user already exist"})
        }
        const newUser= new UserModel({
            name,email,password:hashPassword,mobileNo
        })
        await newUser.save()
        const token = jwt.sign(
      {
        id: newUser._id,
      },
      "myjwtsecretkey"
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ error: false });
    }
    catch(err){
      console.log(err)
        res.json({error:true, err})
    }
}

export const checkUserLoggedIn=async(req,res)=>{
  try{
    const token=req.cookies.token;
    if(!token){
      return res.json({loggedIn:false,error:true,message:"no token"})

    }
    const verifiedJWT=jwt.verify(token,"myjwtsecretkey")
    const user=await UserModel.findById(verifiedJWT.id,{password:0});
    if(!user){
      return res.json({loggedIn:false})
    }
    return res.json({loggedIn:true})
  }catch(err){
    console.log(err);
    return res.json({loggedIn:false,error:err})
  }
}