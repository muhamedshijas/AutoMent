import Razorpay from 'razorpay'
import crypto from 'crypto'
import BookingModel from '../models/BookingModel.js'


let instance=new Razorpay({
    key_id:"rzp_test_XwdQoSEsOiDbSW",
    key_secret:"qC9DmFjrY8ChbJ5lotzxNg68",
})

export async function paymentOrder(req,res){
try{
    const {bookingAmount}=req.body
    var options={
        amount:bookingAmount*100,
        currency:"INR"
    };
    instance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err)
                res.json({ err: true, message: "server error" })
            } else {
                res.json({ err: false, order })
            }
        });
}catch(error){
    res.json({ err: true, message: "server error", error })
    console.log(err)
}
}


export async function verifyPayment(req, res) {
    try {
        console.log(req.body)

        const {ownerMobileNo,
            response,
            ownerName,
            vehicleNo,
            vehicleBrand,
            vehicleYear,
            vehicleModel,
            serviceCenterId,
            packageChoosen,
            date,
            serviceCenterName,
            userId}
            =req.body

        let body = response.razorpay_order_id + "|" + response.razorpay_payment_id;

        var expectedSignature = crypto.createHmac('sha256',"qC9DmFjrY8ChbJ5lotzxNg68")
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === response.razorpay_signature){
            const booking= await BookingModel.create({
                ownerMobileNo,ownerName,vehicleNo,vehicleBrand,vehicleModel,userId,serviceCenterName
                ,vehicleYear,serviceCenterId,packageChoosen,dateOfService:date
            })
            return res.json({
                err:false, booking
            })
        }else{
            return res.json({
                err:true, message:"payment verification failed"
            })
        }


    }catch(error){
        console.log(error)
        res.json({error, err:true, message:"somethin went wrong"})
    }

}