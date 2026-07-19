// src/Admin/AdminLogin/AdminLogin.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthProvider';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signInUser, loading, user, isAdmin, userRole, fetchUserRole } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    email: 'admin@exclusive.com',
    password: 'admin123'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Check if user is admin and redirect
  useEffect(() => {
    console.log('🔍 AdminLogin - User:', user?.email);
    console.log('🔍 AdminLogin - isAdmin:', isAdmin);
    console.log('🔍 AdminLogin - userRole:', userRole);
    console.log('🔍 AdminLogin - loading:', loading);

    if (!loading && user && !redirecting) {
      if (isAdmin || userRole === 'admin') {
        console.log('✅ Admin detected, redirecting to dashboard');
        setRedirecting(true);
        navigate('/admin/dashboard');
      } else {
        console.log('⚠️ Not admin, redirecting to home');
        toast('You are not an admin. Redirecting to home.', {
          duration: 3000,
          position: 'top-right',
          icon: '⚠️'
        });
        navigate('/');
      }
    }
  }, [user, isAdmin, userRole, loading, navigate, redirecting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔐 Attempting admin login...');
      const result = await signInUser(formData.email, formData.password);
      
      if (result?.user) {
        console.log('✅ Login successful, fetching user role...');
        
        // Manually fetch user role to ensure it's updated
        const role = await fetchUserRole(result.user.uid);
        console.log('📄 Fetched role:', role);
        
        // Check if admin
        if (role === 'admin') {
          toast.success('Admin login successful!', {
            duration: 3000,
            position: 'top-right'
          });
          console.log('🚀 Redirecting to admin dashboard...');
          navigate('/admin/dashboard');
        } else {
          toast('You are not an admin. Redirecting to home.', {
            duration: 3000,
            position: 'top-right',
            icon: '⚠️'
          });
          navigate('/');
        }
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password. Please check your credentials.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email. Please register first.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format. Please check your email.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Contact support.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = error.message || 'Login failed. Please try again.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-right'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setError('');

    if (!resetEmail) {
      setError('Please enter your email address');
      setResetLoading(false);
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, resetEmail, {
        url: `${window.location.origin}/auth/admin-login`,
        handleCodeInApp: false,
      });
      
      setResetSent(true);
      toast.success('Password reset email sent! Please check your inbox.', {
        duration: 5000,
        position: 'top-right'
      });
      
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetSent(false);
        setResetEmail('');
      }, 3000);
      
    } catch (error) {
      console.error('Reset password error:', error);
      
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address. Please check and try again.';
          break;
        default:
          errorMessage = error.message || 'Failed to send reset email. Please try again.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-right'
      });
    } finally {
      setResetLoading(false);
    }
  };

  // Show loading state
  if (loading || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="flex space-x-2 justify-center">
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {redirecting ? 'Redirecting...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Admin Login
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Enter your admin credentials to access the dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-600 dark:text-red-400">
              ⚠️ {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Admin Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="admin@exclusive.com"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || loading}
            className="btn btn-primary w-full py-3 text-base"
          >
            {isLoading || loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Login as Admin'
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link to="/auth/login" className="text-sm text-primary hover:underline block">
            ← Back to User Login
          </Link>
          <Link to="/auth/register" className="text-sm text-gray-500 hover:underline block">
            Create an account
          </Link>
          <Link to="/" className="text-sm text-gray-500 hover:underline block">
            ← Back to Home
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            <strong>Demo Credentials:</strong><br />
            Email: admin@exclusive.com<br />
            Password: admin123
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                🔑 Reset Password
              </h3>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetSent(false);
                  setResetEmail('');
                  setError('');
                }}
                className="btn btn-ghost btn-sm btn-circle"
              >
                ✕
              </button>
            </div>

            {resetSent ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">📧</div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Email Sent!
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Password reset link has been sent to your email address.
                  Please check your inbox and follow the instructions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="admin@exclusive.com"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2 mt-2">
                    <p className="text-xs text-red-600 dark:text-red-400">
                      ⚠️ {error}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 btn btn-primary"
                  >
                    {resetLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetSent(false);
                      setResetEmail('');
                      setError('');
                    }}
                    className="flex-1 btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;