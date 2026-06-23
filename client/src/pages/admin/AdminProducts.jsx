import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { HiPlus, HiPencil, HiTrash, HiX, HiPhotograph } from 'react-icons/hi';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', features: '', price: '', rentalPrice: '', rentalAvailable: false, category: 'business', status: 'active',
  });
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', features: '', price: '', rentalPrice: '', rentalAvailable: false, category: 'business', status: 'active' });
    setFiles([]);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      features: product.features?.join(', ') || '',
      price: product.price,
      rentalPrice: product.rentalPrice,
      rentalAvailable: product.rentalAvailable,
      category: product.category,
      status: product.status || 'active',
    });
    setFiles([]);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('features', JSON.stringify(formData.features.split(',').map(f => f.trim()).filter(Boolean)));
      data.append('price', formData.price);
      data.append('rentalPrice', formData.rentalPrice);
      data.append('rentalAvailable', formData.rentalAvailable);
      data.append('category', formData.category);
      data.append('status', formData.status);
      files.forEach(f => data.append('images', f));

      if (editingProduct) {
        await axios.put(`/products/${editingProduct._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await axios.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    } catch { alert('Error deleting product'); }
  };

  const inputClasses = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 font-inter text-sm focus:outline-none focus:border-primary-500/50 transition-all";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-instrument text-3xl font-bold text-white mb-1">Products</h1>
          <p className="text-gray-500 font-inter text-sm">Manage your robot products</p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-cabin font-semibold rounded-xl hover:bg-primary-600 transition-all hover:shadow-glow text-sm"
          onClick={openCreate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiPlus size={18} /> Add Product
        </motion.button>
      </div>

      {/* Products Table */}
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right p-4 text-xs font-manrope font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-lg">
                      {product.images?.length > 0 ? (
                        <img src={product.images[0].url} alt="" className="w-full h-full object-cover rounded-lg" />
                      ) : '🤖'}
                    </div>
                    <div>
                      <p className="text-white font-manrope font-semibold text-sm">{product.name}</p>
                      <p className="text-gray-500 text-xs font-inter truncate max-w-[200px]">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs font-cabin bg-primary-500/10 text-primary-400 rounded-full capitalize">{product.category}</span>
                </td>
                <td className="p-4 text-white font-manrope text-sm">₹{product.price?.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-cabin rounded-full capitalize ${
                    product.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>{product.status || 'active'}</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(product)} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                      <HiPencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
                      <HiTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 font-inter">No products yet. Add your first product!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-dark-800 rounded-2xl border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-manrope font-bold text-white text-xl">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <HiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className={inputClasses} />
                <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required rows={3} className={`${inputClasses} resize-none`} />
                <input type="text" placeholder="Features (comma separated)" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className={inputClasses} />
                
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Price (₹)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className={inputClasses} />
                  <input type="number" placeholder="Rental Price/day" value={formData.rentalPrice} onChange={e => setFormData({...formData, rentalPrice: e.target.value})} className={inputClasses} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={`${inputClasses} cursor-pointer`}>
                    <option value="business" className="bg-dark-800">Business</option>
                    <option value="event" className="bg-dark-800">Event</option>
                    <option value="student" className="bg-dark-800">Student</option>
                    <option value="interactive" className="bg-dark-800">Interactive</option>
                    <option value="exhibition" className="bg-dark-800">Exhibition</option>
                    <option value="custom" className="bg-dark-800">Custom</option>
                  </select>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className={`${inputClasses} cursor-pointer`}>
                    <option value="active" className="bg-dark-800">Active</option>
                    <option value="inactive" className="bg-dark-800">Inactive</option>
                    <option value="coming-soon" className="bg-dark-800">Coming Soon</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.rentalAvailable} onChange={e => setFormData({...formData, rentalAvailable: e.target.checked})} className="w-4 h-4 rounded accent-primary-500" />
                  <span className="text-sm text-gray-300 font-inter">Available for Rental</span>
                </label>

                {/* File Upload */}
                <div>
                  <label className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-dashed border-white/10 rounded-xl cursor-pointer hover:border-primary-500/30 transition-colors">
                    <HiPhotograph className="text-gray-500" size={20} />
                    <span className="text-sm text-gray-400 font-inter">
                      {files.length > 0 ? `${files.length} file(s) selected` : 'Upload Images'}
                    </span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={e => setFiles(Array.from(e.target.files))} />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-primary-500 text-white font-cabin font-bold rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
