import express from 'express';
import { getAdminRequests, getAdminServiceCenter, getAdminUsers, getBlockUser, getunBlockUser } from '../controllers/adminController.js';

const router=express.Router();

router.get('/users',getAdminUsers)
router.patch('/users/block',getBlockUser)
router.patch('/users/unblock',getunBlockUser)
router.get('/serviceCenter',getAdminServiceCenter)
router.get('/requests',getAdminRequests)
export default router
