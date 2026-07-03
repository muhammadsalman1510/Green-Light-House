import { Router } from 'express';
import { create, getAll, getById, updateStatus, getStats } from '../controllers/orderController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/',           create);
router.get('/admin/stats', requireAdmin, getStats);
router.get('/admin',       requireAdmin, getAll);
router.get('/admin/:id',   requireAdmin, getById);
router.put('/admin/:id',   requireAdmin, updateStatus);

export default router;
