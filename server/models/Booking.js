import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  type: {
    type: String,
    enum: ['demo', 'rental', 'purchase'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // days for rental
    default: 1,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
    default: '',
  },
  contactPhone: {
    type: String,
  },
  location: {
    type: String,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
