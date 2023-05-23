import express from 'express';
import { checkUserLoggedIn, forgetOtp, resetUserPassword, userLogin, userLogout, userOtpVerify, userSignup, verifyForgetOtp } from '../controllers/userController.js';

const router=express.Router();

router.post("/signUp",userSignup)
router.post("/register/verify",userOtpVerify)
router.post("/login",userLogin)
router.get("/check",checkUserLoggedIn)
router.get("/logout",userLogout)
router.post("/forgot",forgetOtp)
router.post("/forgot/verify",verifyForgetOtp)
router.post ("/forgot/reset",resetUserPassword)
export default router