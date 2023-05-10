import AdminModel from "../models/AdminModel.js";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import ServiceCenterModel from "../models/ServiceCenterModel.js";


var salt = bcrypt.genSaltSync(10);

export async function adminLogin(req,res){
    try{
        console.log(req.body)
    const {email,password}=req.body;
    const admin=await AdminModel.findOne({email});
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
export async function adminLogout(req,res){
    res.cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
    console.log("logged in");
}

export async function checkAdminLoggedIn(req,res){
    try{
        const token=req.cookies.adminToken;
        if(!token){
            return res.json({loggedIn:false,error:true,message:"No Token"})
        }
        const verifiedJWT=jwt.verify(token,"myjwtsecretkey")
        const admin=await AdminModel.findById(verifiedJWT.id,{password:0})
        if(!admin){
            return res.json({loggedIn:false})
        }
        return res.json({admin,loggedIn:true})
    }catch(err){
        res.json({loggedIn:false ,error:err})
        console.log(err)
    }
}

export async function getAdminUsers(req,res){
    try{
        const name=req.query.name?? ""
        let users=await UserModel.find({name:new RegExp(name, 'i') }).lean()
        res.json(users)

    }catch(err){
        return res.json({err:true,message:"Something went wrong" ,error:err})

    }


}

export async function getBlockUser(req,res){
    const id=req.body.id
    await UserModel.findByIdAndUpdate(id,{$set:{block:true}}).lean()
    res.json({err:false})

}
export async function getunBlockUser(req,res){
    const id=req.body.id
    await UserModel.findByIdAndUpdate(id,{$set:{block:false}}).lean()
    res.json({err:false})

}

export async function getAdminServiceCenter(req,res){
    try{
       
        const name=req.query.name?? ""
        let serviceCenters=await ServiceCenterModel.find({name:new RegExp(name, 'i'),permission:true}).lean()
        console.log(serviceCenters)
        res.json(serviceCenters)

    }catch(err){
        return res.json({err:true,message:"Something went wrong" ,error:err})

    }

    


}


export async function getAdminRequests(req,res){
    try{
       
        const name=req.query.name?? ""
        let serviceCenters=await ServiceCenterModel.find({name:new RegExp(name, 'i'),permission:false}).lean()
        console.log(serviceCenters)
        res.json(serviceCenters)

    }catch(err){
        return res.json({err:true,message:"Something went wrong" ,error:err})

    }
}