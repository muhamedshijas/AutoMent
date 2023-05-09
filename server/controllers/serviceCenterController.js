import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  cloudinary from '../config/cloudinary.js'



export async function serviceCenterSignUp(req,res){
    try{
        const {email,password,place,district}=req.body
        console.log(req.body)

   
    
    }
    catch(err){  
        console.log(err)
    }
}