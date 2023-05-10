import mongoose from "mongoose"
const ServiceCenterSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password :{
        type:String,
    },
   place:{
    type:String,
   },
   district:{
    type:String,
   },
    certificate:{    
        type:Object,
        required:true
    },
    permission:{
        type:Boolean,
        default:false
    }

})

const ServiceCenterModel=mongoose.model("ServiceCenter", ServiceCenterSchema)
export default ServiceCenterModel