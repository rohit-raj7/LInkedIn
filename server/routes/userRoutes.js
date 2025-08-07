// routes/userRoutes.js
import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile); // GET: user + posts + profile

export default router;
