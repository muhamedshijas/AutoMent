import express from 'express';
import { getAddWorker } from '../controllers/serviceCenterController.js';
const router=express.Router();

router.post('/addworker',getAddWorker)

export default router