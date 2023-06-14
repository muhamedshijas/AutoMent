import AdminModel from "../models/AdminModel.js";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import ServiceCenterModel from "../models/ServiceCenterModel.js";
import ServiceModel from "../models/ServiceModel.js";
import WorkerModel from "../models/WorkerModel.js"
import BookingModel from "../models/BookingModel.js"
import { createCipheriv } from "crypto";


var salt = bcrypt.genSaltSync(10);

export async function adminLogin(req, res) {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.json({ error: true, message: "no access to this page" })
        }
        const adminValid = bcrypt.compareSync(password, admin.password)
        if (!adminValid) {
            return res.json({ error: true, message: "Wrong Password" })
        }
        const token = jwt.sign({
            admin: true,
            id: admin._id
        }, "myjwtsecretkey"
        )
        return res.cookie("adminToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ error: false })
    }
    catch {
        res.json({ message: "server error", error: err })
        console.log(err)
    }
}
export async function adminLogout(req, res) {
    res.cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
    console.log("logged in");
}

export async function checkAdminLoggedIn(req, res) {
    try {
        const token = req.cookies.adminToken;
        if (!token) {
            return res.json({ loggedIn: false, error: true, message: "No Admin Token" })
        }
        const verifiedJWT = jwt.verify(token, "myjwtsecretkey")
        const admin = await AdminModel.findById(verifiedJWT.id, { password: 0 })
        if (!admin) {
            return res.json({ loggedIn: false })
        }
        return res.json({ admin, loggedIn: true })
    } catch (err) {
        res.json({ loggedIn: false, error: err })
        console.log(err)
    }
}

export async function getAdminUsers(req, res) {
    try {
        const name = req.query.name ?? ""
        let users = await UserModel.find({ name: new RegExp(name, 'i') }).lean()
        res.json(users)

    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })

    }


}

export async function getBlockUser(req, res) {
    const id = req.body.id
    await UserModel.findByIdAndUpdate(id, { $set: { block: true } }).lean()
    res.json({ err: false })

}
export async function getunBlockUser(req, res) {
    const id = req.body.id
    await UserModel.findByIdAndUpdate(id, { $set: { block: false } }).lean()
    res.json({ err: false })

}

export async function getAdminServiceCenter(req, res) {
    try {

        const name = req.query.name ?? ""
        let serviceCenters = await ServiceCenterModel.find({ name: new RegExp(name, 'i'), permission: true }).lean()
        console.log(serviceCenters)
        res.json(serviceCenters)

    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })

    }
}


export async function getAdminRequests(req, res) {
    try {

        const name = req.query.name ?? ""
        let serviceCenters = await ServiceCenterModel.find({ name: new RegExp(name, 'i'), permission: false }).lean()
        console.log(serviceCenters)
        res.json(serviceCenters)

    } catch (err) {
        return res.json({ err: true, message: "Something went wrong", error: err })

    }
}

export async function getViewServiceCenter(req, res) {
    try {
        const serviceCenter = await ServiceCenterModel.findById(req.params.id).lean();

        console.log(serviceCenter)
        res.json(serviceCenter)
    } catch (err) {

    }
}

export async function getAcceptRequest(req, res) {
    try {
        const id = req.body.id
        await ServiceCenterModel.findByIdAndUpdate(id, { $set: { permission: true } }).lean()
        res.json({ err: false })
    } catch {

    }
}


export async function getBlockServiceCenter(req, res) {
    const id = req.body.id
    await ServiceCenterModel.findByIdAndUpdate(id, { $set: { permission: false } }).lean()
    res.json({ err: false })

}

export async function addServices(req, res) {
    try {
        const { services } = req.body
        console.log(services)

        const existService = await ServiceModel.findOne({ serviceName: services }).lean()
        if (existService) {
            return res.json({ error: true, message: "service  already exist" })
        }
        const newservice = new ServiceModel({ serviceName: services })
        await newservice.save()
        console.log("saved")
        res.json({ error: false });
    }
    catch (err) {
        console.log(err)
        res.json({ error: true, err })
    }
}


export async function getServices(req, res) {

    try {
      
        let services = await ServiceModel.find().lean()
        console.log(services)
        res.json(services)
    }
    catch (err) {
        console.log(err)
    }
}


export async function getDeleteService(req, res) {
    const id = req.query.id
    console.log(id)
    await ServiceModel.findByIdAndDelete(id)
    res.json({ err: false })

}

export async function getAdminDashboard(req, res) {
    try {
        const userCount = await UserModel.find().countDocuments()
        const serviceCenterCount = await ServiceCenterModel.find().countDocuments()
        const workerCount = await WorkerModel.find().countDocuments()
        const totalBooking = await BookingModel.find().countDocuments()
        const users = await UserModel.find().limit(5).sort({ _id: -1 })
        const serviceCenters = await ServiceCenterModel.find().limit(5).sort({ _id: -1 })
        const booking = await BookingModel.find().lean().sort({ id: -1 })
        const monthlyDataArray = await BookingModel.aggregate([{ $group: { _id: { $month: "$dateOfService" }, totalRevenue: { $sum: "$amount" } } }])
        let monthlyDataObject = {}
        monthlyDataArray.map(item => {
            monthlyDataObject[item._id] = item.totalRevenue
        })
        let monthlyData = []
        for (let i = 1; i <= 12; i++) {
            monthlyData[i - 1] = monthlyDataObject[i] ?? 0
        }
        let byPackage = await BookingModel.aggregate([{ $group: { _id: "$packageChoosen", count: { $sum: 1 }, price: { $sum: "$amount" } } }])
        const sd=new Date()
        const ed=new Date(new Date().setDate(new Date().getDate() - 7))
        const weeklyDataArray = await BookingModel.aggregate([{ $match:{$and:[{dateOfService:{$gt:ed,$lt:sd}}]}}, { $group: { _id: { $dayOfWeek: "$dateOfService" }, sum: { $sum: "$amount" } } }])
        let weeklyDataObject={}
        weeklyDataArray.map(item => {
            weeklyDataObject[item._id] = item.sum
        })
        let weeklyData = []
        for (let i = 1; i <= 7; i++) {
            weeklyData[i - 1] = weeklyDataObject[i] ?? 0
        }
        res.json({ userCount, serviceCenterCount, workerCount, totalBooking, users, serviceCenters, booking,monthlyData,byPackage,weeklyData})
    } catch (err) {
        console.log(err)
    }   
}

