import express from 'express';
import { checkUserLoggedIn, userLogin, userLogout, userOtpVerify, userSignup } from '../controllers/userController.js';

const router=express.Router();

router.post("/signUp",userSignup)
router.post("/register/verify",userOtpVerify)
router.post("/login",userLogin)
router.get("/check",checkUserLoggedIn)
router.get("/logout",userLogout)
export default router