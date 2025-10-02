import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const openAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const closeAdminLogin = () => {
    setShowAdminLogin(false);
  };

  return (
    <>
      <nav className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Product App</Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:underline">Products</Link>
            {user ? (
              <>
                <Link to="/profile" className="hover:underline">Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:underline">Admin</Link>
                )}
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
                <button onClick={openAdminLogin} className="hover:underline">Admin Panel</button>
              </>
            )}
          </div>
        </div>
      </nav>
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              onClick={closeAdminLogin}
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <Login onSuccess={closeAdminLogin} isModal={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
