import express from 'express';
import { serviceCenterSignUp } from '../controllers/serviceCenterController.js';

const router=express.Router();

router.post('/signup',serviceCenterSignUp)

export default router