import express from 'express';
import { checkWorkerLoggedIn, getWorkerLogout, workerLogin } from '../controllers/workerController.js';

const router=express.Router();

router.post("/login",workerLogin)
router.get("/check", checkWorkerLoggedIn)
router.get("/logout", getWorkerLogout)
export default router