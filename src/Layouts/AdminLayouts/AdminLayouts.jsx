// src/Layouts/AdminLayouts/AdminLayouts.jsx
import React, { useContext, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthProvider';
import {
  FaHome,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUserShield,
  FaSignOutAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCog,
  FaFileAlt,
  FaStar,
  FaTag,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaStore,
  FaBell,
  FaClock,        // ✅ Added FaClock
  FaTruck,        // ✅ Added FaTruck
  FaCheckCircle  
} from 'react-icons/fa';

const AdminLayouts = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut().catch(console.error);
    navigate('/auth/admin-login');
  };

// src/Layouts/AdminLayouts/AdminLayouts.jsx (Updated nav items)
const adminNavItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
  { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
  { name: 'Orders', path: '/admin/orders', icon: <FaBox /> },
  { name: 'Products', path: '/admin/products', icon: <FaShoppingCart /> },
  { name: 'Revenue', path: '/admin/revenue', icon: <FaMoneyBillWave /> },
  { name: 'Reviews', path: '/admin/reviews', icon: <FaStar /> },
  { name: 'Categories', path: '/admin/categories', icon: <FaTag /> },
  { name: 'Settings', path: '/admin/settings', icon: <FaCog /> },
];

// Product sub-items
const productSubItems = [
  { name: 'Add Product', path: '/admin/products/add', icon: <FaPlus /> },
  { name: 'Edit Products', path: '/admin/products/edit', icon: <FaEdit /> },
  { name: 'Categories', path: '/admin/products/categories', icon: <FaTag /> },
];

// Order sub-items
const orderSubItems = [
  { name: 'All Orders', path: '/admin/orders/all', icon: <FaBox /> },
  { name: 'Pending', path: '/admin/orders/pending', icon: <FaClock /> },
  { name: 'Shipped', path: '/admin/orders/shipped', icon: <FaTruck /> },
  { name: 'Delivered', path: '/admin/orders/delivered', icon: <FaCheckCircle /> },
];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-2xl transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <NavLink to="/admin/dashboard" className="text-2xl font-bold text-primary">
            <span className="flex items-center gap-2">
              <FaUserShield className="text-primary" />
              Admin
            </span>
          </NavLink>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden btn btn-ghost btn-sm btn-circle"
          >
            <FaTimes />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <img
                src={user?.photoURL || "https://i.ibb.co/Jj5t7mW/default-avatar.png"}
                alt="Admin"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 dark:text-white truncate">
                {user?.displayName || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || 'admin@exclusive.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
          <ul className="space-y-1">
            {adminNavItems.map((item) => {
              // Check if item has sub-items
              let subItems = [];
              if (item.path === '/admin/products') subItems = productSubItems;
              if (item.path === '/admin/orders') subItems = orderSubItems;

              return (
                <li key={item.path}>
                  {subItems.length > 0 ? (
                    <details className="group">
                      <summary className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all">
                        <span className="text-primary">{item.icon}</span>
                        <span className="flex-1 font-medium text-gray-700 dark:text-gray-300">
                          {item.name}
                        </span>
                        <FaChevronDown className="text-gray-400 text-xs transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="mt-1 ml-6 space-y-1">
                        {subItems.map((sub) => (
                          <li key={sub.path}>
                            <NavLink
                              to={sub.path}
                              className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                                  isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                              }
                            >
                              <span className="text-sm">{sub.icon}</span>
                              <span className="text-sm">{sub.name}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                          isActive
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      <span className="text-primary">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <FaBars />
              </button>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                Admin Panel
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button className="btn btn-ghost btn-sm btn-circle relative">
                <FaBell />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Store Front */}
              <NavLink to="/" className="btn btn-ghost btn-sm flex items-center gap-2">
                <FaStore />
                <span className="hidden sm:inline">Store</span>
              </NavLink>

              {/* Admin Profile */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full ring ring-primary ring-offset-2">
                    <img
                      src={user?.photoURL || "https://i.ibb.co/Jj5t7mW/default-avatar.png"}
                      alt="Admin"
                    />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52">
                  <li className="pointer-events-none text-center font-bold py-2 text-gray-800 dark:text-white">
                    {user?.displayName || 'Admin'}
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <NavLink to="/profile" className="flex items-center gap-2">
                      <FaUserShield /> My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="flex items-center gap-2">
                      <FaStore /> Store Front
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayouts;