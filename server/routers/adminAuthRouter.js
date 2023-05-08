import express from 'express';
import { adminLogin } from '../controllers/adminController.js';


const router=express.Router();

router.post("/login",adminLogin)
router.get("/check", )
router.get("/logout", )

export default router