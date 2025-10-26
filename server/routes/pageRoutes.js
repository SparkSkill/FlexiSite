import express from 'express';
import {
  createPage,
  getPages,
  getPageById,
  getPageBySlug,
  updatePage,
  deletePage,
} from '../controllers/pageController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPages);
router.get('/slug/:slug', getPageBySlug);
router.get('/:id', getPageById);

router.post('/', verifyToken, createPage);
router.put('/:id', verifyToken, updatePage);
router.delete('/:id', verifyToken, deletePage);

export default router;

