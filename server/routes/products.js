import { Router } from 'express';
import {
  getAll, getBySlug, getById, create,
  update, remove, adminGetAll,
} from '../controllers/productController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/',           getAll);
router.get('/admin/all',  requireAdmin, adminGetAll);
router.get('/slug/:slug', getBySlug);
router.get('/:id',        getById);

// Admin
router.post('/',          requireAdmin, create);
router.put('/:id',        requireAdmin, update);
router.delete('/:id',     requireAdmin, remove);

export default router;
