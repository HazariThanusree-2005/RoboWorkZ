import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HiMail, HiTrash, HiEye } from 'react-icons/hi';

const statusColors = {
  new: 'bg-blue-500/20 text-blue-400',
  'in-progress': 'bg-amber-500/20 text-amber-400',
  resolved: 'bg-emerald-500/20 text-emerald-400',
  closed: 'bg-gray-500/20 text-gray-400',
};

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get('/inquiries');
      setInquiries(res.data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/inquiries/${id}`, { status });
      fetchInquiries();
    } catch { alert('Error updating status'); }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await axios.delete(`/inquiries/${id}`);
      fetchInquiries();
      if (selected?._id === id) setSelected(null);
    } catch { alert('Error deleting'); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-instrument text-3xl font-bold text-white mb-1">Inquiries</h1>
        <p className="text-gray-500 font-inter text-sm">Manage contact form submissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Service</th>
                <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-right p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(inq => (
                <tr key={inq._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setSelected(inq)}>
                  <td className="p-4">
                    <p className="text-white text-sm font-manrope">{inq.name}</p>
                    <p className="text-gray-500 text-xs font-inter">{inq.email}</p>
                  </td>
                  <td className="p-4 text-gray-400 text-sm font-inter">{inq.service}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-cabin rounded-full capitalize ${statusColors[inq.status]}`}>{inq.status}</span>
                  </td>
                  <td className="p-4 text-gray-500 text-xs font-inter">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={(e) => { e.stopPropagation(); setSelected(inq); }} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <HiEye size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteInquiry(inq._id); }} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
                        <HiTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-inter">No inquiries yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        <div className="glass rounded-xl p-6">
          {selected ? (
            <div>
              <h2 className="font-manrope font-bold text-white text-lg mb-4">Inquiry Details</h2>
              <div className="space-y-4">
                <div><p className="text-xs text-gray-500 font-inter">Name</p><p className="text-white text-sm">{selected.name}</p></div>
                <div><p className="text-xs text-gray-500 font-inter">Email</p><p className="text-primary-400 text-sm">{selected.email}</p></div>
                <div><p className="text-xs text-gray-500 font-inter">Phone</p><p className="text-white text-sm">{selected.phone || 'N/A'}</p></div>
                <div><p className="text-xs text-gray-500 font-inter">Service</p><p className="text-white text-sm">{selected.service}</p></div>
                <div><p className="text-xs text-gray-500 font-inter">Message</p><p className="text-gray-300 text-sm leading-relaxed">{selected.message}</p></div>
                <div>
                  <p className="text-xs text-gray-500 font-inter mb-2">Update Status</p>
                  <select
                    value={selected.status}
                    onChange={e => updateStatus(selected._id, e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500/50 cursor-pointer"
                  >
                    <option value="new" className="bg-dark-800">New</option>
                    <option value="in-progress" className="bg-dark-800">In Progress</option>
                    <option value="resolved" className="bg-dark-800">Resolved</option>
                    <option value="closed" className="bg-dark-800">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <HiMail className="mx-auto text-gray-600 mb-3" size={40} />
              <p className="text-gray-500 text-sm font-inter">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
