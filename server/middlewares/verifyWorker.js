import jwt from "jsonwebtoken";
import WorkerModel from "../models/WorkerModel.js";

const verifyWorker = async (req, res, next) => {
    try {
        const token = req.cookies.workerToken;
        if (!token)
            return res.json({ loggedIn: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
        const worker= await WorkerModel.findOne({_id:verifiedJWT.id}, { password: 0 });
        if (!worker) {
            return res.json({ loggedIn: false });
        }
        req.worker=worker;
        next()
    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}
export default verifyWorker