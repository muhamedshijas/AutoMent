import express from 'express';
import { checkUserLoggedIn, userSignup } from '../controllers/userController.js';

const router=express.Router();

router.post("/signUp",userSignup)
router.get("/check",checkUserLoggedIn)
export default router