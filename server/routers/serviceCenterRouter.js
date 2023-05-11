import express from 'express';
import { getAddWorker, getBlockWorker, getServiceCenterWorkers, getunBlockWorker } from '../controllers/serviceCenterController.js';
const router=express.Router();

router.post('/addworker',getAddWorker)
router.get('/workers',getServiceCenterWorkers)
router.patch('/workers/block',getBlockWorker)
router.patch('/workers/unblock',getunBlockWorker)

export default router