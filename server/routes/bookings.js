import express from 'express';
import { createBooking, getMyBookings, getAllBookings, updateBooking, cancelBooking } from '../controllers/bookingController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// User routes
router.post('/', auth, createBooking);
router.get('/my', auth, getMyBookings);
router.put('/:id/cancel', auth, cancelBooking);

// Admin routes
router.get('/', auth, admin, getAllBookings);
router.put('/:id', auth, admin, updateBooking);

export default router;
