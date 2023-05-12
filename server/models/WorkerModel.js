import mongoose from "mongoose"
const WorkerSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
  
    mobileNO:{
        type:Number,
    },
    block:{
        type:Boolean,
        default:false
    },
    serviceCenterId:{
        type:String
    },serviceCenter:{
        type:String
    }

})

const WorkerModel=mongoose.model("Worker", WorkerSchema)
export default WorkerModel