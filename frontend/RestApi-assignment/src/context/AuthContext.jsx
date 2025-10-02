import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  });

  // Add token to requests
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const res = await axios.post('http://localhost:3000/api/v1/users/refresh-token', { refreshToken });
            localStorage.setItem('accessToken', res.data.data.token);
            localStorage.setItem('refreshToken', res.data.data.refreshToken);
            error.config.headers.Authorization = `Bearer ${res.data.data.token}`;
            return api.request(error.config);
          } catch (err) {
            logout();
          }
        }
      }
      return Promise.reject(error);
    }
  );

  const login = async (email, password) => {
    const res = await api.post('/users/login', { email, password });
    localStorage.setItem('accessToken', res.data.data.accessToken);
    localStorage.setItem('refreshToken', res.data.data.refreshToken);
    setUser(res.data.data.user);
  };

  const register = async (fullName, username, email, password) => {
    const res = await api.post('/users/register', { fullName, username, email, password });
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post('/users/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const getCurrentUser = async () => {
    try {
      const res = await api.get('/users/current-user');
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    await api.put('/users/change-password', { currentPassword, newPassword });
  };

  useEffect(() => {
    getCurrentUser();
    setLoading(false);
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    changePassword,
    api,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
