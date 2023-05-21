import express from 'express';
import { getWorkerbookingDetials, getWorkerBookings, getWorkerProfileEdit, workerEditProfile, workerUpdateBooking } from '../controllers/workerController.js';

const router=express.Router();

router.get('/edit-profile/:id',getWorkerProfileEdit)
router.post('/edit-profile/',workerEditProfile)
router.get('/bookingdetials',getWorkerBookings)
router.get('/viewbookingdetials/:id',getWorkerbookingDetials)
router.post('/updatebooking',workerUpdateBooking)
export default router