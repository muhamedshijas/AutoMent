import express from 'express'
import dbConnect from './config/dbConnect.js';
const app = express();
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path'
import adminAuthRouter from './routers/adminAuthRouter.js'
import userAuthRouter from './routers/userAuthRouter.js'
import  serviceCenterRouter from './routers/serviceCenterRouter.js'
import adminRouter from './routers/adminRouter.js'
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit: '50mb'}))
app.use(express.static(path.resolve()+"/public"))
app.use(
  cors({
    origin: [
      "http://localhost:3000", 
    ],
    credentials: true,
  })
);
dbConnect()

app.use("/admin/auth/",adminAuthRouter)
app.use("/admin",adminRouter)
app.use("/user/auth/",userAuthRouter)
app.use('/serviceCenter/auth',serviceCenterRouter)
app.listen(5000, ()=>{
    console.log("started on  port 5000");
})    