import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  cloudinary from '../config/cloudinary.js'
import ServiceCenterModel from '../models/ServiceCenterModel.js'


var salt = bcrypt.genSaltSync(10);

export async function serviceCenterSignUp(req,res){
    try{
        console.log("hiii")
        const {name,email,password,place,district}=req.body
        console.log(name)
        const certificate=await cloudinary.uploader.upload(req.body.certificate,{
            folder:'Automent'
        })
        const hashPassword = bcrypt.hashSync(password, salt);
        const serviceCenter = await ServiceCenterModel.create({...req.body,password:hashPassword, certificate});
        console.log("saved");
        const token = jwt.sign(
            {
                id: serviceCenter._id
            },"myjwtsecretkey"
        )
        return res.cookie("serviceCenteTokenr", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false })

    }catch(err){
        console.log(err)
        res.json({err:true , error:err, message:"Something Went Wrong"})
    }

}
        export async function getServiceCenterLogIn(req,res){
            try{
        const {email,password}=req.body;
        const serviceCenter=await ServiceCenterModel.findOne({email})
        if(!serviceCenter){
            return res.json({err:true,message:"no servie center found"})
            console.log("no email")
        }
        if(!serviceCenter.permission){
            return res.json({err:true,message:"you have no permission check after some time"})
            console.log("no acces")
        }
        const serviceCenterValid=bcrypt.compareSync(password,serviceCenter.password)
        if(!serviceCenterValid){
            return res.json({err:true,message:"wrong password"})
        }
        const token = jwt.sign(
            {
                id: serviceCenter._id
            },"myjwtsecretkey"
            
        ) 

        
        return res.cookie("serviceCenterToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false })
    }
    catch (err) {
        console.log(err)
        res.json({ message: "something went wrong", error: err, err:true })
    }
}

    export async function checkServiceCenterLoggedIn(req,res){
        try{
            const token=req.cookies.serviceCenterToken
            if(!token){
                return res.json({err:true,message:"No token",loggedIn:false})
            }
            const verifiedJWT=jwt.verify(token,"myjwtsecretkey") 
            const serviceCenter=await ServiceCenterModel.findById(verifiedJWT.id,{password:0})
        if(!serviceCenter){
            return res.json({loggedIn:false})
        }
        return res.json({serviceCenter,loggedIn:true})
    }catch(err){
        console.log(err)
        res.json({loggedIn:false ,error:err})
    }
}


export async function serviceCenterLogout(req,res){
    res.cookie("serviceCenterToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
    console.log("logged in");
}

export async function getAddWorker(req,res){
    console.log(req.body)
}