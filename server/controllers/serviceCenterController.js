import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  cloudinary from '../config/cloudinary.js'
import BookingModel from '../models/BookingModel.js';
import ServiceCenterModel from '../models/ServiceCenterModel.js'
import WorkerModel from '../models/WorkerModel.js';


var salt = bcrypt.genSaltSync(10);

export async function serviceCenterSignUp(req,res){
    try{
        console.log("hiii")
        const {name,email,password,place,district}=req.body
        console.log(name)
        const certificate=await cloudinary.uploader.upload(req.body.certificate,{
            folder:'Automent'
        })
        const logo=await cloudinary.uploader.upload(req.body.logo,{
            folder:'Automent'
        })
        const hashPassword = bcrypt.hashSync(password, salt);
        const serviceCenter = await ServiceCenterModel.create({...req.body,password:hashPassword, certificate,logo});
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
            console.log("no email")
            return res.json({err:true,message:"no servie center found"})
        }
        if(!serviceCenter.permission){
            console.log("no acces")
            return res.json({err:true,message:"you have no permission check after some time"})
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
    
    try{
        const {name,email,_id,mobileNo,password}=req.body
        console.log(_id)
        const hashPassword=bcrypt.hashSync(password,salt)
        const worker=await WorkerModel.findOne({email}).lean()
        if(worker){
            return res.json({error:true,message:"worker already exist"})
        }
        const serviceCenter=await ServiceCenterModel.findById(_id).lean()
        const serviceCenterName=serviceCenter.name
        const newWorker= new WorkerModel({
            name,email,serviceCenterId:_id,mobileNo,password:hashPassword,
            serviceCenter:serviceCenterName
        })
        await newWorker.save()
        console.log("saved")   
      res.json({ error: false });
    }
    catch(err){
      console.log(err)
        res.json({error:true, err})
    }
}
export async function getServiceCenterWorkers(req,res){

        try{
            const  token=req.cookies.serviceCenterToken
            const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
            console.log(verifiedJWT.id)
            const  id=verifiedJWT.id;
            const name=req.query.name?? ""
            let workers = await WorkerModel.find({ serviceCenterId: id, name: new RegExp(name, 'i') }).lean()
            console.log(workers)
        res.json(workers)
        }
        catch(err){
            console.log(err)
        }
}

export async function getBlockWorker(req,res){
    const id=req.body.id
    await WorkerModel.findByIdAndUpdate(id,{$set:{block:true}}).lean()
    res.json({err:false})

}
export async function getunBlockWorker(req,res){
    const id=req.body.id
    await WorkerModel.findByIdAndUpdate(id,{$set:{block:false}}).lean()
    res.json({err:false})

}

export async function getServiceCenterbooking(req,res){

try{
    const  token=req.cookies.serviceCenterToken
    const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
    console.log(verifiedJWT.id)
    const  id=verifiedJWT.id;
    let bookings = await BookingModel.find({serviceCenterId:id}).lean()   
    res.json(bookings)
}
catch(err){
    console.log(err)
}
}


export async function getbookingDetials(req,res){
       try{
        const booking=await BookingModel.findById(req.params.id).lean();
        const id=booking.serviceCenterId

        let workers = await WorkerModel.find({ serviceCenterId: id}).lean()
    
        res.json({booking,workers})
       }catch{

       }
}

export async function updateBooking(req,res){
    try{
        const id=req.body.bookingId
        await BookingModel.findByIdAndUpdate(id,{$set:{worker:req.body.worker}})
    return res.json({error:false})
    }catch(err){
        console.log(err)
    }
}

export async function getServiceCenterDashboard(req,res){
    try{
        const id=req.params.id
        const workers =await WorkerModel.find({serviceCenterId:id}).lean()
        const worker =await WorkerModel.find({serviceCenterId:id}).lean().countDocuments()
        const bookings=await BookingModel.find({serviceCenterId:id}).populate('worker')
        const upcoming=await BookingModel.find({serviceCenterId:id,status:"upcoming"}).countDocuments()
        const completed=await BookingModel.find({serviceCenterId:id,status:"completed"}).countDocuments()
        const totalBooking=await BookingModel.find({serviceCenterId:id}).countDocuments()
        res.json({workers,bookings,upcoming,completed,totalBooking,worker,error:false})

    }catch(err){
        console.log(err) 
    }
}