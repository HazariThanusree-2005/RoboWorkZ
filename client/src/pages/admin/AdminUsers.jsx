import { useState, useEffect } from 'react';
import axios from 'axios';
import { HiUsers, HiTrash } from 'react-icons/hi';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users');
      setUsers(res.data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting user');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-instrument text-3xl font-bold text-white mb-1">Users</h1>
        <p className="text-gray-500 font-inter text-sm">Manage registered users</p>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">User</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Email</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Role</th>
              <th className="text-left p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Joined</th>
              <th className="text-right p-4 text-xs font-manrope font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-manrope">{user.username}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-400 text-sm font-inter">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-cabin rounded-full capitalize ${
                    user.role === 'admin' ? 'bg-primary-500/20 text-primary-400' : 'bg-white/5 text-gray-400'
                  }`}>{user.role}</span>
                </td>
                <td className="p-4 text-gray-500 text-xs font-inter">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  {user.role !== 'admin' && (
                    <button onClick={() => deleteUser(user._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
                      <HiTrash size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-inter">No users yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
