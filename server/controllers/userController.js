import UserModel from '../models/UserModel.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { log } from 'console';
import ServiceCenterModel from '../models/ServiceCenterModel.js';
import sentOTP from '../helpers/SentOtp.js';
import BookingModel from '../models/BookingModel.js';
import FeedbackModel from '../models/FeedBackModel.js'

var salt=bcrypt.genSaltSync(10);

export async function userSignup(req,res){
    try{
      const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({ err: true, message: "User Already Exist" })
        }
        let otp = Math.ceil(Math.random() * 1000000)
        console.log(otp)
    let otpSent = await sentOTP(email, otp)
        const token = jwt.sign(
            {
                otp: otp
            },"myjwtsecretkey"
           
        )
        return res.cookie("tempToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 10,
            sameSite: "none",
        }).json({ err: false })
    }
    catch(err){
      console.log(err)
        res.json({error:true, err})
    }
}


export async function userOtpVerify(req, res) {
    try {
        const { name, email, password, mobileNo,otp } = req.body;
        const tempToken = req.cookies.tempToken;

        if (!tempToken) {
            return res.json({ err: true, message: "OTP Session Timed Out" });
        }

        const verifiedTempToken = jwt.verify(tempToken,"myjwtsecretkey");
       
        if (otp!= verifiedTempToken.otp) {
            return res.json({ err: true, message: "Invalid OTP" });
        }

        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = new UserModel({ name, email, password: hashPassword ,mobileNo})
        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser._id
            },
            "myjwtsecretkey"
        )
        return res.cookie("userToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false })
    }
    catch (err) {
        console.log(err)
        res.json({ error: err, err: true, message: "something went wrong" })
    }
}


export async function userLogin(req,res){
  try{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email})
    if(!user){
      return res.json({error:true,message:"No such user found"})
    }

    if (user.block){
      return res.json({ error: true, message: "You are blocked" })
      }
            
    const validUser=bcrypt.compareSync(password,user.password)
  if(!validUser){
    return res.json({error:true,message:"Wrong Password"})
  }
  console.log(user)
  const token=jwt.sign({
    id:user._id
  },"myjwtsecretkey"
  )


  return res.cookie("userToken",token,{
        httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
    }).json({error:false})
}catch(err){
  return res.json({error:true,error:err})
  console.log(err)
}
}

export const checkUserLoggedIn=async(req,res)=>{
  try{
    const token=req.cookies.userToken;
    if(!token){
      return res.json({loggedIn:false,error:true,message:"no fgfdjk"})
    }
    const verifiedJWT=jwt.verify(token,"myjwtsecretkey")
    const user=await UserModel.findById(verifiedJWT.id,{password:0});
    if(!user){
      return res.json({loggedIn:false})
    }
    return res.json({user,loggedIn:true})
  }catch(err){
    console.log(err);
    return res.json({loggedIn:false,error:err})
  }
}

export async function userLogout(req,res){
    res.cookie("userToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
    console.log("logged in");
}

export async function getUserProfileEdit(req,res){
  const id=req.params.id

  const user=await UserModel.findById(id).lean()
  res.json(user)
}

export async function userEditProfile(req,res){
  const id=req.body.id
  const {name,email,mobileNo}=req.body
  await UserModel.findByIdAndUpdate(id,{$set:{
    name,email,mobileNo
  }})
  return res.json({error:false})
}

export async function getUserServiceCenterList(req,res){

  try{
        const name=req.query.name?? ""
        let servicecenter=await ServiceCenterModel.find({district:new RegExp(name, 'i'),permission:true }).lean()
        const number=await ServiceCenterModel.find({permission:true}).countDocuments()
        const review =await FeedbackModel.find().lean()
        
        res.json({serviceCenter:servicecenter,review:review,totalServiceCenter:number})

    }catch(err){
        return res.json({err:true,message:"Something went wrong" ,error:err})

    }
  
}

export async function getServiceCenter(req,res){
  try{
    let totalRating = 0;
    console.log("hiiii")
    
    const id=req.params.id
    const serviceStation=await ServiceCenterModel.findById(id).lean()
    const reviews = await FeedbackModel.find({serviceCenterId: req.params.id }).populate('userId').lean()

    for (let item of reviews) {
      totalRating += item.rating
  }
  let reviewCount =  reviews.length != 0 ? reviews.length : 1;
  const rating = totalRating / reviewCount;
  console.log(reviews)
    res.json({serviceStation,rating,reviews})
    
  }catch(err){
      console.log(err) 
  }
}


export async function userBookService(req,res){
  try{
    const {ownerMobileNo,ownerName,vehicleNo,vehicleBrand,vehicleYear,vehicleModel,serviceCenterId,packageChoosen,date,serviceCenterName,userId,packageDetials}=req.body
    const newBooking=new BookingModel({ 
      ownerMobileNo,
      ownerName,
      vehicleNo,
      vehicleBrand,
      vehicleModel,
      userId,
      serviceCenterName,
      vehicleYear,
      serviceCenterId,
      packageChoosen,
      packageDetials,
      dateOfService:date})
      await newBooking.save();
    res.json({error:false})

  }catch(err){
    console.log(err)
        res.json({ error: err, err: true, message: "something went wrong" })
  }
}
export async function getUserBookings(req,res){
  try{
    const id=req.params.id
    const bookings=await BookingModel.find({userId:id}).lean()

    res.json({error:false,bookings})
  }catch(err){

  }
}

export async function forgetOtp(req,res){
  console.log(req.body)
  const {email}=req.body
 const user= await UserModel.findOne({email:email}).lean()
 if(!user){
  res.json({error:true,message:"no user found"})
 }
 let otp = Math.ceil(Math.random() * 1000000)
 let otpSent = await sentOTP(email, otp)
 console.log(otp)
 const token = jwt.sign(
     {
         otp: otp
     },"myjwtsecretkey"
     
 )
 return res.cookie("tempToken", token, {
     httpOnly: true,
     secure: true,
     maxAge: 1000 * 60 * 10,
     sameSite: "none",
 }).json({ err: false })
}


export async function verifyForgetOtp(req,res){
  try {
    const { otp } = req.body;
    const tempToken = req.cookies.tempToken;

    if (!tempToken) {
        return res.json({ err: true, message: "OTP Session Timed Out" });
    }

    const verifiedTempToken = jwt.verify(tempToken, "myjwtsecretkey");
    if (otp != verifiedTempToken.otp) {
        return res.json({ err: true, message: "Invalid OTP" });
    }
    return res.json({ err: false })
}
catch (err) {
    console.log(err)
    res.json({ error: err, err: true, message: "something went wrong" })
}
}

export async function resetUserPassword(req, res) {
  try {
      console.log(req.body)
      const { email, password, otp } = req.body;
      const tempToken = req.cookies.tempToken;

      if (!tempToken) {
          return res.json({ err: true, message: "OTP Session Timed Out" });
      }
      const verifiedTempToken = jwt.verify(tempToken,"myjwtsecretkey");
     
      if (otp != verifiedTempToken.otp) {
          return res.json({ err: true, message: "Invalid OTP" });
      }
      const hashPassword = bcrypt.hashSync(password, salt);
      await UserModel.updateOne({ email }, {
          $set: {
              password: hashPassword
          }
      })
      return res.json({ err: false })
  }
  catch (err) {
      console.log(err)
      res.json({ error: err, err: true, message: "something went wrong" })
  }
}

export async function getUserServiceHistory(req,res){
  const id=req.params
  const service=await BookingModel.findById(req.params.id).populate('worker')
  console.log(service)
  res.json(service)
}  

export async function addServiceCenterFeedback(req, res) {
  try {
    console.log(req.body)
      const { serviceCenterId, rating, review } = req.body;
      await FeedbackModel.updateOne({ userId: req.user._id,serviceCenterId}, {
          rating, review
      }, { upsert: true })
      return res.json({ err: false })

  } catch (error) {
      console.log(error)
      res.json({ err: true, error, message: "something went wrong" })
  }
}

export async function getAppoiments(req,res){

  console.log(req.params)
  const id=req.params.id

  const appoiments=await BookingModel.find({userId:id}).lean()
  res.json(appoiments)
}