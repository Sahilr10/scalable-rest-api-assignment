import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminUsers = () => {
  const { api } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roleUpdateId, setRoleUpdateId] = useState(null);
  const [newRole, setNewRole] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (id, role) => {
    setRoleUpdateId(id);
    setNewRole(role);
  };

  const updateUserRole = async (id) => {
    try {
      await api.put(`/admin/users/${id}`, { role: newRole });
      setRoleUpdateId(null);
      fetchUsers();
    } catch (err) {
      setError('Failed to update role');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center border-b">
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.fullName}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                {roleUpdateId === user._id ? (
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="py-2 px-4">
                {roleUpdateId === user._id ? (
                  <>
                    <button
                      onClick={() => updateUserRole(user._id)}
                      className="mr-2 bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setRoleUpdateId(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleRoleChange(user._id, user.role)}
                      className="mr-2 bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Edit Role
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
