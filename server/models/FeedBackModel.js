import mongoose from "mongoose"

const schema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    serviceCenterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ServiceCenter'
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true,
    }
},{timestamps:true })

const FeedbackModel=mongoose.model("Feedback", schema)
export default FeedbackModel