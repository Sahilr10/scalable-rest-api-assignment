import React, { useState } from 'react';
import AdminUsers from './AdminUsers';
import AdminProducts from './AdminProducts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 mr-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Manage Products
        </button>
      </div>
      {activeTab === 'users' && <AdminUsers />}
      {activeTab === 'products' && <AdminProducts />}
    </div>
  );
};

export default AdminDashboard;
