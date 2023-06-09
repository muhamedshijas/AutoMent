import express from 'express';
import { getAddWorker, getBlockWorker, getbookingDetials, getServiceCenterbooking, getServiceCenterDashboard, getServiceCenterWorkers, getunBlockWorker, updateBooking } from '../controllers/serviceCenterController.js';
const router=express.Router();

router.post('/addworker',getAddWorker)
router.get('/workers',getServiceCenterWorkers)
router.patch('/workers/block',getBlockWorker)
router.patch('/workers/unblock',getunBlockWorker)
router.get('/bookingdetials',getServiceCenterbooking)
router.get('/viewbookingdetials/:id',getbookingDetials)
router.post('/updatebooking',updateBooking)
router.get('/dashboard/:id',getServiceCenterDashboard)

export default router