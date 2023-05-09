import express from 'express';
import { checkUserLoggedIn, userLogin, userLogout, userSignup } from '../controllers/userController.js';

const router=express.Router();

router.post("/signUp",userSignup)
router.post("/login",userLogin)
router.get("/check",checkUserLoggedIn)
router.get("/logout",userLogout)
export default router