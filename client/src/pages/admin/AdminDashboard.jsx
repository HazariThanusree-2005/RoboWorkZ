import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HiCube, HiMail, HiCalendar, HiUsers, HiTrendingUp, HiExclamation } from 'react-icons/hi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/admin/stats');
        setStats(res.data);
      } catch {
        setStats({
          totalProducts: 0, totalInquiries: 0, totalBookings: 0, totalUsers: 0,
          pendingBookings: 0, newInquiries: 0, recentInquiries: [], recentBookings: [],
        });
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { icon: HiCube, label: 'Total Products', value: stats?.totalProducts || 0, color: 'from-violet-500 to-purple-600' },
    { icon: HiMail, label: 'Inquiries', value: stats?.totalInquiries || 0, color: 'from-blue-500 to-cyan-600', badge: stats?.newInquiries },
    { icon: HiCalendar, label: 'Bookings', value: stats?.totalBookings || 0, color: 'from-emerald-500 to-teal-600', badge: stats?.pendingBookings },
    { icon: HiUsers, label: 'Users', value: stats?.totalUsers || 0, color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-instrument text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-500 font-inter text-sm mb-8">Overview of your RoboWorkz platform</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            className="glass rounded-xl p-6 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <card.icon className="text-white" size={20} />
                </div>
                {card.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-cabin font-bold bg-red-500/20 text-red-400 rounded-full flex items-center gap-1">
                    <HiExclamation size={12} />{card.badge} new
                  </span>
                )}
              </div>
              <div className="text-2xl font-manrope font-bold text-white">{card.value}</div>
              <div className="text-xs text-gray-500 font-inter mt-1">{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="glass rounded-xl p-6">
          <h2 className="font-manrope font-semibold text-white text-lg mb-4 flex items-center gap-2">
            <HiMail className="text-primary-400" size={20} /> Recent Inquiries
          </h2>
          {stats?.recentInquiries?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentInquiries.map(inq => (
                <div key={inq._id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white text-sm font-manrope">{inq.name}</p>
                    <p className="text-gray-500 text-xs font-inter">{inq.service}</p>
                  </div>
                  <span className="text-xs text-gray-500 font-inter">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm font-inter">No inquiries yet</p>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="glass rounded-xl p-6">
          <h2 className="font-manrope font-semibold text-white text-lg mb-4 flex items-center gap-2">
            <HiCalendar className="text-primary-400" size={20} /> Recent Bookings
          </h2>
          {stats?.recentBookings?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentBookings.map(booking => (
                <div key={booking._id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white text-sm font-manrope">{booking.user?.username}</p>
                    <p className="text-gray-500 text-xs font-inter">{booking.product?.name} - {booking.type}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-cabin font-semibold rounded-full capitalize ${
                    booking.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>{booking.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm font-inter">No bookings yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
