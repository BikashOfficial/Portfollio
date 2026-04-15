import express from 'express';
import { verifyAccessCode } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/verify - Verify access code
router.post('/verify', verifyAccessCode);

export default router;
