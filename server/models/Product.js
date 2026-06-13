import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  features: [{
    type: String,
  }],
  price: {
    type: Number,
    default: 0,
  },
  rentalPrice: {
    type: Number,
    default: 0,
  },
  rentalAvailable: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ['business', 'event', 'student', 'interactive', 'exhibition', 'custom'],
    default: 'business',
  },
  images: [{
    url: String,
    publicId: String,
  }],
  video: {
    url: String,
    publicId: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'coming-soon'],
    default: 'active',
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
