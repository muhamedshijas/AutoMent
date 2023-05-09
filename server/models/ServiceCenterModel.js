import mongoose from "mongoose"
const ServiceCenterSchema = new mongoose.Schema({
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
    logo:{
        type:String,
    },
   place:{
    type:String,
   },
   district:{
    type:String,
   },
    certificate:{
        type:String,
        required:true
    },
    permission:{
        type:Boolean,
        default:false
    }

})

const ServiceCenterModel=mongoose.model("User", ServiceCenterSchema)
export default ServiceCenterModel