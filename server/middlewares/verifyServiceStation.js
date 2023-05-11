import jwt from "jsonwebtoken";
import ServiceCenterModel from '../models/ServiceCenterModel.js'
const verifyServiceCenter = async (req, res, next) => {
    try {
        const token = req.cookies.serviceCenterToken;
        if (!token)
            return res.json({ loggedIn: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, "");
        const hospital = await HospitalModel.findOne({_id:verifiedJWT.id}, { password: 0 });
        if (!hospital) {
            return res.json({ loggedIn: false });
        }
        req.hospital=hospital;
        next()
    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}
export default verifyHospital