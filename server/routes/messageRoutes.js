import express from 'express';
import {
  submitMessage,
  getMessages,
  getMessageById,
  markRead,
  deleteMessage,
} from '../controllers/messageController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public contact form submission
router.post('/', submitMessage);

// Admin operations
router.get('/', verifyToken, getMessages);
router.get('/:id', verifyToken, getMessageById);
router.patch('/:id/read', verifyToken, markRead);
router.delete('/:id', verifyToken, deleteMessage);

export default router;

