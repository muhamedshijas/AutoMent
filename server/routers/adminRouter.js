import express from 'express';
import { getAdminUsers } from '../controllers/adminController.js';

const router=express.Router();

router.get('/users',getAdminUsers)
export default router