import { Router } from 'express';
import { get, update } from '../controllers/settingsController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();
router.get('/', get);
router.put('/', requireAdmin, update);
export default router;
