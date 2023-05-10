import express from 'express';
import { checkAdminLoggedIn } from '../controllers/adminController.js';
import { checkServiceCenterLoggedIn, getServiceCenterLogIn, serviceCenterLogout, serviceCenterSignUp ,} from '../controllers/serviceCenterController.js';

const router=express.Router();

router.post('/signup',serviceCenterSignUp)
router.post('/login',getServiceCenterLogIn)
router.get('/check',checkServiceCenterLoggedIn)
router.get('/logout',serviceCenterLogout)

export default router