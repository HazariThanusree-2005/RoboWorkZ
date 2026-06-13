import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Inquiry from '../models/Inquiry.js';
import Booking from '../models/Booking.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
router.get('/stats', auth, admin, async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalInquiries, totalBookings, recentInquiries, recentBookings] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Product.countDocuments(),
      Inquiry.countDocuments(),
      Booking.countDocuments(),
      Inquiry.find().sort({ createdAt: -1 }).limit(5),
      Booking.find().populate('user', 'username email').populate('product', 'name').sort({ createdAt: -1 }).limit(5),
    ]);

    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const newInquiries = await Inquiry.countDocuments({ status: 'new' });

    res.json({
      totalUsers,
      totalProducts,
      totalInquiries,
      totalBookings,
      pendingBookings,
      newInquiries,
      recentInquiries,
      recentBookings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Delete user (Admin)
// @route   DELETE /api/admin/users/:id
router.delete('/users/:id', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ message: 'Cannot delete admin user' });
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
