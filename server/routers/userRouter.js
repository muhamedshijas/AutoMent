import express from 'express';
import { getServiceCenter, getUserBookings, getUserProfileEdit, getUserServiceCenterList, userBookService, userEditProfile } from '../controllers/userController.js';

const router=express.Router();

router.get('/edit-profile/:id',getUserProfileEdit)
router.post('/edit-profile/',userEditProfile)
router.get('/servicecenter',getUserServiceCenterList)
router.get('/chooseservicecenter/:id',getServiceCenter)
router.post('/bookservice',userBookService)
router.get('/profile/:id',getUserBookings)

export default router          