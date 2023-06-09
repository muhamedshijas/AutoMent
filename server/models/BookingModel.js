import mongoose from "mongoose"
const BookingSchema = new mongoose.Schema({
        ownerMobileNo:{
            type:Number
        },
        ownerName:{
            type:String
        },
        vehicleBrand:{
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
        },worker:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Worker'
        },status:{
            type:String,
            default:"upcoming"
        },userId:{
            type:String, 
        },  
        serviceCenterName:{
            type:String
        },
        vehicleCondition:{
            type:String,
            default:""
        },amount:{
            type:Number,
            default:500
        },packageDetials:{
            type:Array
        }

})

const BookingModel=mongoose.model("Booking", BookingSchema)
export default BookingModel