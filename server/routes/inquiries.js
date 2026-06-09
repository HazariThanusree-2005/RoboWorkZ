import express from 'express';
import { createInquiry, getInquiries, updateInquiry, deleteInquiry } from '../controllers/inquiryController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// Public route
router.post('/', createInquiry);

// Admin routes
router.get('/', auth, admin, getInquiries);
router.put('/:id', auth, admin, updateInquiry);
router.delete('/:id', auth, admin, deleteInquiry);

export default router;
