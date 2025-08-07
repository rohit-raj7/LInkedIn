import express from 'express';
import {
  createPost,
  getPublicFeed,
  addComment,
  getComments,deletePost,updatePost,
  togglePostLike,getPostsByUser,
} from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Post routes
router.post('/create', authMiddleware, createPost);
router.get('/feed', getPublicFeed);

// Comment routes
router.post('/comment', authMiddleware, addComment);
router.get('/comment/:postId', getComments);
router.post('/like/:id', authMiddleware, togglePostLike);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id', authMiddleware, updatePost);
router.get('/user/:userId', getPostsByUser);

export default router;
