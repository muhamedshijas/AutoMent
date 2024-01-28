import express from 'express'
import 'dotenv/config'
import dbConnect from './config/dbConnect.js';

import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path'
import adminAuthRouter from './routers/adminAuthRouter.js'
import userAuthRouter from './routers/userAuthRouter.js'
import  serviceCenterAuthRouter from './routers/serviceCenterAuthRouter.js'
import adminRouter from './routers/adminRouter.js'
import serviceCenterRouter from './routers/serviceCenterRouter.js'
import workerAuthRouter from './routers/workerAuthRouter.js'
import userRouter from './routers/userRouter.js'
import WorkerRouter from './routers/WorkerRouter.js'
import verifyServiceCenter from './middlewares/verifyServiceStation.js';
import verifyUser from './middlewares/verifyUser.js';
import verifyWorker from './middlewares/verifyWorker.js';
import verifyAdmin from './middlewares/verifyAdmin.js';
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000", 
    ], 
    credentials: true,
  })
);
dbConnect() 
app.use(cookieParser())
app.use(express.urlencoded({extended:true,limit: '50mb'}))
app.use(express.json({limit: '50mb'}))
app.use(express.static(path.resolve()+"/public"))


app.use("/admin/auth/",adminAuthRouter)
app.use("/admin",verifyAdmin,adminRouter)
app.use("/user/auth/",userAuthRouter)
app.use('/serviceCenter/auth',serviceCenterAuthRouter)
app.use('/servicecenter',verifyServiceCenter,serviceCenterRouter)
app.use('/worker/auth/',workerAuthRouter)
app.use('/user',verifyUser,userRouter)
app.use('/worker',verifyWorker,WorkerRouter)
app.listen(5000, ()=>{
    console.log("started on  port 5000");
})    
