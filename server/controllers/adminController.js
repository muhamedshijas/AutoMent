import AdminModel from "../models/AdminModel.js";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


var salt = bcrypt.genSaltSync(10);

export async function adminLogin(req,res){
    try{
        console.log(req.body)
    const {email,password}=req.body;
    const admin=await AdminModel.findOne({email,admin:true});
    if(!admin){
        return res.json({error:true,message:"no access to this page"})
    }
    const adminValid=bcrypt.compareSync(password,admin.password)
    if(!adminValid){
        return res.json({error:true,message:"Wrong Password"})
    }
    const token=jwt.sign({
        admin:true,
        id:admin._id
    },"myjwtsecretkey"
    )
    return res.cookie("adminToken",token,{
        httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
    }).json({error:false})
    }
    catch{
        res.json({message:"server error",error:err})
        console.log(err)
    }
}

export async function checkAdminLoggedIn(req,res){
    try{
        const token=req.cookies.token;
        if(!token){
            return res.json({loggedIn:false,error:true,message:"No Token"})
        }
        const verifiedJWT=jwt.verify(token,"myjwtsecretkey")
        const admin=await AdminModel.findById(verifiedJWT.id,{password:0})
        console.log(admin)
        if(!admin){
            return res.json({loggedIn:false})
        }
        return res.json({admin,loggedIn:true})
    }catch(err){
        res.json({loggedIn:false ,error:err})
        console.log(err)
    }
}