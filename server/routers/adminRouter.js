import express from 'express';
import { addServices, getAcceptRequest, getAdminRequests, getAdminServiceCenter, getAdminUsers, getBlockServiceCenter, getBlockUser, getDeleteService, getServices, getunBlockUser, getViewServiceCenter } from '../controllers/adminController.js';

const router=express.Router();

router.get('/users',getAdminUsers)
router.patch('/users/block',getBlockUser)
router.patch('/users/unblock',getunBlockUser)
router.get('/serviceCenter',getAdminServiceCenter)
router.get('/requests',getAdminRequests)
router.get('/viewservicecenter/:id',getViewServiceCenter)
router.patch('/serviceCenter/acceptrequest',getAcceptRequest)
router.patch("/servicecenter/block",getBlockServiceCenter)
router.post('/addservice',addServices)
router.get('/service',getServices)
router.delete('/deleteservice',getDeleteService)
export default router
