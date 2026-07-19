import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarker, 
  FaCalendar,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaTrash,
  FaUserCircle,
  FaShoppingBag,
  FaHeart,
  FaStar
} from 'react-icons/fa';

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // User profile state
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Bangladesh',
    bio: '',
    photoURL: '',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // User stats
  const [userStats, setUserStats] = useState({
    orders: 12,
    wishlist: 5,
    reviews: 8,
    totalSpent: 45999
  });

  // Recent orders
  const [recentOrders, setRecentOrders] = useState([
    { id: 'ORD-001', date: '2024-01-15', total: 2499, status: 'Delivered' },
    { id: 'ORD-002', date: '2024-01-10', total: 1199, status: 'Processing' },
    { id: 'ORD-003', date: '2024-01-05', total: 399, status: 'Shipped' }
  ]);

  // Load user data
  useEffect(() => {
    if (user) {
      const userData = {
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || 'Bangladesh',
        bio: user.bio || '',
        photoURL: user.photoURL || '',
        joinDate: user.metadata?.creationTime ? 
          new Date(user.metadata.creationTime).toISOString().split('T')[0] : 
          new Date().toISOString().split('T')[0]
      };
      setProfile(userData);
      setFormData(userData);
    }
  }, [user]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update display name
      if (formData.displayName !== profile.displayName) {
        await updateUserProfile({ displayName: formData.displayName });
      }

      // Update photo
      if (selectedFile) {
        // Upload image to Firebase Storage (you'll need to implement this)
        // const photoURL = await uploadImage(selectedFile);
        // await updateUserProfile({ photoURL });
      }

      // Update profile in your database
      // const response = await updateUserInDatabase(formData);
      
      setProfile(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!', {
        duration: 3000,
        position: 'top-right'
      });
    } catch (error) {
      toast.error('Failed to update profile. Please try again.', {
        duration: 3000,
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setFormData(profile);
    setSelectedFile(null);
    setPreviewUrl('');
    setIsEditing(false);
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      toast.loading('Deleting account...');
      try {
        // Delete user from Firebase
        // await deleteUser(auth.currentUser);
        // Delete user from database
        // await deleteUserFromDatabase(user.uid);
        
        toast.dismiss();
        toast.success('Account deleted successfully');
        navigate('/');
      } catch (error) {
        toast.dismiss();
        toast.error('Failed to delete account. Please try again.');
      }
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'badge-success';
      case 'Processing': return 'badge-warning';
      case 'Shipped': return 'badge-info';
      default: return 'badge-ghost';
    }
  };

  // If not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="text-6xl mb-6">🔒</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Please Login
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You need to be logged in to view your profile.
        </p>
        <button 
          onClick={() => navigate('/auth/login')}
          className="btn btn-primary px-8"
        >
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            My Profile
          </h1>
          <button
            onClick={() => navigate('/')}
            className="btn btn-ghost btn-sm"
          >
            ← Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-4">
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={previewUrl || profile.photoURL || 'https://i.ibb.co/Jj5t7mW/default-avatar.png'}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-primary"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-focus transition-colors">
                    <FaCamera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                )}
              </div>

              {/* Profile Info */}
              <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                {profile.displayName || 'User'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">
                {profile.email}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                  <div className="text-2xl font-bold text-primary">
                    {userStats.orders}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Orders</div>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                  <div className="text-2xl font-bold text-red-500">
                    {userStats.wishlist}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Wishlist</div>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                  <div className="text-2xl font-bold text-yellow-500">
                    {userStats.reviews}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Reviews</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button 
                  onClick={() => navigate('/orders')}
                  className="btn btn-ghost btn-sm w-full justify-start"
                >
                  <FaShoppingBag className="mr-2" /> My Orders
                </button>
                <button 
                  onClick={() => navigate('/wishlist')}
                  className="btn btn-ghost btn-sm w-full justify-start"
                >
                  <FaHeart className="mr-2" /> Wishlist
                </button>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary w-full"
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                ) : (
                  <button 
                    onClick={handleDeleteAccount}
                    className="btn btn-error w-full"
                  >
                    <FaTrash className="mr-2" /> Delete Account
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            {isEditing ? (
              // Edit Form
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Edit Profile
                </h2>

                <form onSubmit={handleUpdateProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text font-medium">Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text font-medium">Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
                        disabled
                      />
                      <span className="text-xs text-gray-500 mt-1">Email cannot be changed</span>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="017XXXXXXXX"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">City</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Dhaka"
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text font-medium">Address</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text font-medium">Bio</span>
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered w-full h-24"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary flex-1"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <>
                          <FaSave className="mr-2" /> Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="btn btn-ghost"
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // View Profile
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    Personal Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <FaUser className="text-primary" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {profile.displayName || 'Not set'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <FaEnvelope className="text-primary" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {profile.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <FaPhone className="text-primary" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {profile.phone || 'Not set'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <FaMapMarker className="text-primary" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {profile.address ? `${profile.address}, ${profile.city}, ${profile.country}` : 'Not set'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <FaCalendar className="text-primary" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {profile.joinDate}
                        </p>
                      </div>
                    </div>

                    {profile.bio && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Bio</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {profile.bio}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <span className="w-1 h-6 bg-primary rounded-full"></span>
                      Recent Orders
                    </h3>
                    <button 
                      onClick={() => navigate('/orders')}
                      className="btn btn-ghost btn-sm"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="font-semibold">#{order.id}</td>
                            <td>{order.date}</td>
                            <td>{formatCurrency(order.total)}</td>
                            <td>
                              <span className={`badge ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Total Spent */}
                <div className="bg-gradient-to-r from-primary to-primary-focus rounded-2xl shadow-lg p-6 text-white">
                  <p className="text-sm opacity-80">Total Spent</p>
                  <p className="text-3xl font-bold">{formatCurrency(userStats.totalSpent)}</p>
                  <p className="text-sm opacity-80 mt-2">Across {userStats.orders} orders</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;