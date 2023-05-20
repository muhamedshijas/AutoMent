import mongoose from "mongoose"
const BookingSchema = new mongoose.Schema({
        ownerMobileNo:{
            type:Number
        },
        ownerName:{
            type:String
        },
        vehiceBrand:{
            type:String
        },
        vehicleNo:{
            type:String
        },
        vehicleModel:{
            type:String
        },
        vehicleYear:{
            type:Number
        },
        serviceCenterId:{
            type:String
        },
        packageChoosen:{
            type:String
        },
        dateBooked:{
            type:Date,
            default:new Date()
        },
        dateOfService:{
            type:Date
        }

})

const BookingModel=mongoose.model("Booking", BookingSchema)
export default BookingModel