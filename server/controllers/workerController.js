import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import WorkerModel from '../models/WorkerModel.js';

export async function workerLogin(req,res){
  try{
    const {email,password}=req.body;
    const worker=await WorkerModel.findOne({email})
    if(!worker){
      return res.json({error:true,message:"No such worker found"})
    }

    if (worker.block){
      return res.json({ error: true, message: "You are blocked" })
      }
            
    const validWorker=bcrypt.compareSync(password,worker.password)
  if(!worker){
    return res.json({error:true,message:"Wrong Password"})
  }
  console.log(worker)
  const token=jwt.sign({
    id:worker._id
  },"myjwtsecretkey"
  )


  return res.cookie("workerToken",token,{
        httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
    }).json({error:false})
}catch(err){
    console.log(err)
  return res.json({error:true,error:err})
}
}

export const checkWorkerLoggedIn=async(req,res)=>{
  try{
    const token=req.cookies.workerToken;
    if(!token){
      return res.json({loggedIn:false,error:true,message:"no fgfdjk"})
    }
    const verifiedJWT=jwt.verify(token,"myjwtsecretkey")
    const worker=await WorkerModel.findById(verifiedJWT.id,{password:0});
    if(!worker){
      return res.json({loggedIn:false})
    }
    return res.json({loggedIn:true})
  }catch(err){
    console.log(err);
    return res.json({loggedIn:false,error:err})
  }
}

export async function getWorkerLogout(req,res){
    res.cookie("workerToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
    console.log("logged in");
}