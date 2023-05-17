import jwt from "jsonwebtoken";
import AdminModel from "../models/AdminModel.js";

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        if (!token)
            return res.json({ loggedIn: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
        const admin= await AdminModel.findOne({_id:verifiedJWT.id}, { password: 0 });
        if (!admin) {
            return res.json({ loggedIn: false });
        }
        req.admin=admin;
        next()
    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}
export default verifyAdmin