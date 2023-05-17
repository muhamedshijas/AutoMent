import jwt from "jsonwebtoken";
import ServiceCenterModel from '../models/ServiceCenterModel.js'
const verifyServiceCenter = async (req, res, next) => {
    try {
        const token = req.cookies.serviceCenterToken;
        if (!token)
            return res.json({ loggedIn: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
        const serviceCenter= await ServiceCenterModel.findOne({_id:verifiedJWT.id}, { password: 0 });
        if (!serviceCenter) {
            return res.json({ loggedIn: false });
        }
        req.serviceCenter=serviceCenter;
        next()
    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}
export default verifyServiceCenter