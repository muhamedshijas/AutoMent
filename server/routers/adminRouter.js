import express from 'express';
import { getAcceptRequest, getAdminRequests, getAdminServiceCenter, getAdminUsers, getBlockServiceCenter, getBlockUser, getunBlockUser, getViewServiceCenter } from '../controllers/adminController.js';

const router=express.Router();

router.get('/users',getAdminUsers)
router.patch('/users/block',getBlockUser)
router.patch('/users/unblock',getunBlockUser)
router.get('/serviceCenter',getAdminServiceCenter)
router.get('/requests',getAdminRequests)
router.get('/viewservicecenter/:id',getViewServiceCenter)
router.patch('/serviceCenter/acceptrequest',getAcceptRequest)
router.patch("/servicecenter/block",getBlockServiceCenter)
export default router
