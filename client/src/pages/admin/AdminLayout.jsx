import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { HiHome, HiCube, HiMail, HiCalendar, HiUsers, HiLogout, HiArrowLeft } from 'react-icons/hi';

const navItems = [
  { path: '/admin', icon: HiHome, label: 'Dashboard', end: true },
  { path: '/admin/products', icon: HiCube, label: 'Products' },
  { path: '/admin/inquiries', icon: HiMail, label: 'Inquiries' },
  { path: '/admin/bookings', icon: HiCalendar, label: 'Bookings' },
  { path: '/admin/users', icon: HiUsers, label: 'Users' },
];

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800/50 border-r border-white/5 flex flex-col fixed h-full z-30">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <span className="text-xl font-manrope font-extrabold">
            <span className="text-white">Robo</span>
<<<<<<< HEAD
            <span className="text-primary-500">WorkZ</span>
=======
            <span className="text-primary-500">Workz</span>
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
          </span>
          <p className="text-xs text-gray-500 font-inter mt-1">Admin Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ path, icon: Icon, label, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-manrope font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-manrope font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <HiArrowLeft size={20} />
            Back to Site
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-manrope font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <HiLogout size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
