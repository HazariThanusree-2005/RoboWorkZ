import { useState, useEffect } from 'react';
import axios from 'axios';
import { HiCalendar } from 'react-icons/hi';

const statusColors = {
  pending: 'bg-amber-500/20 text-amber-400',
  confirmed: 'bg-blue-500/20 text-blue-400',
  'in-progress': 'bg-primary-500/20 text-primary-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/bookings');
      setBookings(res.data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/bookings/${id}`, { status });
      fetchBookings();
    } catch { alert('Error updating'); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-instrument text-3xl font-bold text-white mb-1">Bookings</h1>
        <p className="text-gray-500 font-inter text-sm">Manage demos and rental bookings</p>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">User</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Product</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Type</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-right p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <p className="text-white text-sm font-manrope">{booking.user?.username}</p>
                  <p className="text-gray-500 text-xs font-inter">{booking.user?.email}</p>
                </td>
                <td className="p-4 text-gray-300 text-sm font-inter">{booking.product?.name || 'N/A'}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs font-cabin bg-white/5 text-gray-300 rounded-full capitalize">{booking.type}</span>
                </td>
                <td className="p-4 text-gray-400 text-sm font-inter">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-cabin rounded-full capitalize ${statusColors[booking.status]}`}>{booking.status}</span>
                </td>
                <td className="p-4 text-right">
                  <select
                    value={booking.status}
                    onChange={e => updateStatus(booking._id, e.target.value)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-primary-500/50 cursor-pointer"
                  >
                    <option value="pending" className="bg-dark-800">Pending</option>
                    <option value="confirmed" className="bg-dark-800">Confirmed</option>
                    <option value="in-progress" className="bg-dark-800">In Progress</option>
                    <option value="completed" className="bg-dark-800">Completed</option>
                    <option value="cancelled" className="bg-dark-800">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500 font-inter">No bookings yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
