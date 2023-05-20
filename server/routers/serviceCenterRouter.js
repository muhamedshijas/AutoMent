import express from 'express';
import { getAddWorker, getBlockWorker, getbookingDetials, getServiceCenterbooking, getServiceCenterWorkers, getunBlockWorker } from '../controllers/serviceCenterController.js';
const router=express.Router();

router.post('/addworker',getAddWorker)
router.get('/workers',getServiceCenterWorkers)
router.patch('/workers/block',getBlockWorker)
router.patch('/workers/unblock',getunBlockWorker)
router.get('/bookingdetials',getServiceCenterbooking)
router.get('/viewbookingdetials/:id',getbookingDetials)

export default router