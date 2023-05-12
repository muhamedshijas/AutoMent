import express from 'express';
import { getWorkerProfileEdit, workerEditProfile } from '../controllers/workerController.js';

const router=express.Router();

router.get('/edit-profile/:id',getWorkerProfileEdit)
router.post('/edit-profile/',workerEditProfile)
export default router