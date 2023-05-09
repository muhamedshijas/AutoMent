import express from 'express';
import { adminLogin, checkAdminLoggedIn } from '../controllers/adminController.js';


const router=express.Router();

router.post("/login",adminLogin)
router.get("/check", checkAdminLoggedIn)
router.get("/logout", )

export default router