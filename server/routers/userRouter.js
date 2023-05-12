import express from 'express';
import { getUserProfileEdit, userEditProfile } from '../controllers/userController.js';

const router=express.Router();

router.get('/edit-profile/:id',getUserProfileEdit)
router.post('/edit-profile/',userEditProfile)
export default router