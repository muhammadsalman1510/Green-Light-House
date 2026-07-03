import { Router } from 'express';
import {
  getForProduct, submit, getPending,
  adminGetAll, approve, remove, addReply,
} from '../controllers/reviewController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/product/:productId',  getForProduct);
router.post('/product/:productId', submit);

// Admin
router.get('/admin/pending',       requireAdmin, getPending);
router.get('/admin/all',           requireAdmin, adminGetAll);
router.put('/admin/:id/approve',   requireAdmin, approve);
router.put('/admin/:id/reply',     requireAdmin, addReply);
router.delete('/admin/:id',        requireAdmin, remove);

export default router;
