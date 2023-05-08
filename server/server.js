import express from 'express'
import dbConnect from './config/dbConnect.js';
const app = express();
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path'
import adminAuthRouter from './routers/adminAuthRouter.js'

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
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

app.listen(5000, ()=>{
    console.log("started on  port 5000");
})