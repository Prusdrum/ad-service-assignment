import { Router } from 'express';
import AdsRouter from './ads';

// Init router and path
const router = Router();

router.use('/', AdsRouter);

// Export the base-router
export default router;
