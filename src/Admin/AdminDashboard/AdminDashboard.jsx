// src/Admin/AdminDashboard/AdminDashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, isAdmin, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    revenue: 0
  });

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error('Please login first!');
        navigate('/auth/admin-login');
      } else if (!isAdmin) {
        toast.error('Access denied. Admin only area!');
        navigate('/');
      } else {
        // Load dashboard data
        loadDashboardData();
      }
    }
  }, [isAdmin, loading, navigate, user]);

  const loadDashboardData = () => {
    // Simulate loading data - Replace with actual API calls
    setStats({
      users: 1234,
      orders: 456,
      products: 789,
      revenue: 45678
    });
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
      navigate('/auth/admin-login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
          <p className="text-gray-600 mt-2">You don't have permission to view this page.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              👋 Welcome, {user?.displayName || 'Admin'}!
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Here's what's happening with your store today.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
          >
            <span>🚪</span> Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600 text-xl">👥</div>
              <div>
                <p className="text-sm text-gray-500">Users</p>
                <p className="text-xl font-bold">{stats.users.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg text-green-600 text-xl">📦</div>
              <div>
                <p className="text-sm text-gray-500">Orders</p>
                <p className="text-xl font-bold">{stats.orders.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600 text-xl">🛍️</div>
              <div>
                <p className="text-sm text-gray-500">Products</p>
                <p className="text-xl font-bold">{stats.products.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg text-orange-600 text-xl">💰</div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-xl font-bold">${stats.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-2">👤 Manage Users</h3>
            <p className="text-sm text-gray-600 mb-4">View and manage all registered users</p>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Go to Users →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-2">📦 Manage Orders</h3>
            <p className="text-sm text-gray-600 mb-4">View and manage all orders</p>
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Go to Orders →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-2">🛍️ Manage Products</h3>
            <p className="text-sm text-gray-600 mb-4">Add, edit, or delete products</p>
            <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
              Go to Products →
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">📋 Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="text-sm font-medium">New order #1234</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Pending</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="text-sm font-medium">User registered</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">New</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Product added: iPhone 15</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">Updated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;