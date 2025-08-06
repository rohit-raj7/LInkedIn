import express from 'express';
import { createPost, getPublicFeed } from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.get('/feed', getPublicFeed);

export default router;
