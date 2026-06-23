import Booking from '../models/Booking.js';

// @desc    Create booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { product, type, date, duration, notes, contactPhone, location } = req.body;
    
    const booking = await Booking.create({
      user: req.user._id,
      product,
      type,
      date,
      duration,
      notes,
      contactPhone,
      location,
    });

    await booking.populate('product');
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('product')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
export const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const bookings = await Booking.find(filter)
      .populate('user', 'username email')
      .populate('product', 'name')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update booking status (Admin)
// @route   PUT /api/bookings/:id
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, totalAmount: req.body.totalAmount },
      { new: true }
    ).populate('user', 'username email').populate('product', 'name');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel a completed booking' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
