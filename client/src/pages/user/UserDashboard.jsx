import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { HiCalendar, HiHeart, HiCube, HiClock } from 'react-icons/hi';

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/bookings/my');
        setBookings(res.data);
      } catch { /* ignore */ }
      setLoading(false);
    };
    fetchData();
  }, []);

  const statusColors = {
    pending: 'bg-amber-500/20 text-amber-400',
    confirmed: 'bg-blue-500/20 text-blue-400',
    'in-progress': 'bg-primary-500/20 text-primary-400',
    completed: 'bg-emerald-500/20 text-emerald-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-instrument text-4xl font-bold text-white mb-2">
            Welcome, <span className="text-gradient">{user?.username}</span>
          </h1>
          <p className="text-gray-500 font-inter mb-10">Manage your bookings and favorites</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: HiCalendar, label: 'Total Bookings', value: bookings.length, color: 'text-blue-400' },
            { icon: HiClock, label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'text-amber-400' },
            { icon: HiCube, label: 'Active', value: bookings.filter(b => b.status === 'in-progress').length, color: 'text-primary-400' },
            { icon: HiHeart, label: 'Favorites', value: user?.favorites?.length || 0, color: 'text-red-400' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="glass rounded-xl p-5">
                <stat.icon className={`${stat.color} mb-2`} size={24} />
                <div className="text-2xl font-manrope font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 font-inter">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="mb-12">
          <h2 className="font-manrope font-bold text-white text-xl mb-6">Recent Bookings</h2>
          {bookings.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center">
              <p className="text-gray-500 font-inter mb-4">No bookings yet</p>
              <Link to="/products" className="text-primary-400 font-cabin font-semibold hover:text-primary-300">
                Browse Products →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map(booking => (
                <div key={booking._id} className="glass rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-manrope font-semibold text-white">{booking.product?.name || 'Product'}</h3>
                    <p className="text-sm text-gray-500 font-inter">
                      {booking.type} • {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-cabin font-semibold rounded-full capitalize ${statusColors[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
