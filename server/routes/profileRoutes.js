// routes/profileRoutes.js
import express from 'express';
import { createOrUpdateProfile, getProfileByUserId } from '../controllers/profileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:userId', authMiddleware, getProfileByUserId); // GET by userId
router.post('/', authMiddleware, createOrUpdateProfile);   // Create/update

export default router;
