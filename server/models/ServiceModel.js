import mongoose from "mongoose"
const ServiceSchema = new mongoose.Schema({
   serviceName:{
    type:String
   }
    
})

const ServiceModel=mongoose.model("Service", ServiceSchema)
export default ServiceModel