import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, description, features, price, rentalPrice, rentalAvailable, category, status } = req.body;

    // Handle image uploads
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'roboworkz/products',
          transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
        });
        images.push({ url: result.secure_url, publicId: result.public_id });
      }
    }

    const product = await Product.create({
      name,
      description,
      features: features ? JSON.parse(features) : [],
      price,
      rentalPrice,
      rentalAvailable,
      category,
      status,
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updates = { ...req.body };
    if (updates.features && typeof updates.features === 'string') {
      updates.features = JSON.parse(updates.features);
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'roboworkz/products',
          transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
        });
        newImages.push({ url: result.secure_url, publicId: result.public_id });
      }
      updates.images = [...(product.images || []), ...newImages];
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete images from Cloudinary
    for (const img of product.images) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
