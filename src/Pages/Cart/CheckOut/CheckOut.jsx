import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../../../Context/CartContext';
import toast from 'react-hot-toast';

const CheckOut = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    area: 'dhaka',
    notes: ''
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    return true;
  };

  // Payment methods with real links
  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: '💵',
      description: 'Pay when you receive your order',
      link: null
    },
    {
      id: 'bkash',
      name: 'bKash',
      icon: '📱',
      description: 'Pay with bKash mobile wallet',
      link: 'https://www.bkash.com/bn/payment',
      account: {
        number: '017XXXXXXXX',
        type: 'Merchant',
        reference: 'Send money to this bKash number'
      }
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: '📱',
      description: 'Pay with Nagad mobile wallet',
      link: 'https://www.nagad.com.bd/payment',
      account: {
        number: '017XXXXXXXX',
        type: 'Merchant',
        reference: 'Send money to this Nagad number'
      }
    },
    {
      id: 'rocket',
      name: 'Rocket',
      icon: '🚀',
      description: 'Pay with Rocket mobile banking',
      link: 'https://www.rocket.com.bd/payment',
      account: {
        number: '017XXXXXXXX',
        type: 'Merchant',
        reference: 'Send money to this Rocket number'
      }
    }
  ];

  // Handle place order
  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    // If payment is not COD, show payment popup with link
    if (paymentMethod !== 'cod') {
      const method = paymentMethods.find(p => p.id === paymentMethod);
      setSelectedPayment(method);
      setShowPaymentPopup(true);
      return;
    }

    // For COD, proceed directly
    processOrder();
  };

  // Process order
  const processOrder = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newOrderId = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderId(newOrderId);
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
      setShowPaymentPopup(false);
    }
  };

  // Open payment link in new tab
  const openPaymentLink = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Calculate totals
  const subtotal = getTotalPrice();
  const shippingCharge = formData.area === 'dhaka' ? 80 : 130;
  const shipping = subtotal > 5000 ? 0 : shippingCharge;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  // Order placed screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">✅</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Order Placed! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your order has been placed successfully
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
            <p className="text-lg font-bold text-primary">{orderId}</p>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/orders')}
              className="w-full btn btn-primary"
            >
              View My Orders
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full btn btn-ghost"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment Popup with real links
  if (showPaymentPopup && selectedPayment) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {selectedPayment.icon} {selectedPayment.name} Payment
            </h3>
            <button 
              onClick={() => setShowPaymentPopup(false)}
              className="btn btn-ghost btn-sm btn-circle"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Account Details */}
            {selectedPayment.account && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Account Number</span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {selectedPayment.account.number}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {selectedPayment.account.type}
                  </span>
                </div>
                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    ⚠️ {selectedPayment.account.reference}
                  </p>
                </div>
              </div>
            )}

            {/* Total Amount */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                💡 Total Amount: <strong>{formatPrice(total)}</strong>
              </p>
            </div>

            {/* Payment Link Button */}
            {selectedPayment.link && (
              <button
                onClick={() => openPaymentLink(selectedPayment.link)}
                className="w-full btn btn-primary py-3 text-base flex items-center justify-center gap-2"
              >
                <span>🔗</span>
                Pay with {selectedPayment.name}
                <span>→</span>
              </button>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPaymentPopup(false);
                  toast.success('Payment completed! We will verify your payment.');
                  processOrder();
                }}
                className="flex-1 btn btn-success"
              >
                I've Made the Payment
              </button>
              <button
                onClick={() => setShowPaymentPopup(false)}
                className="flex-1 btn btn-ghost"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Your order will be processed after payment confirmation
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart check
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add some items to your cart before checking out.
        </p>
        <Link to="/" className="btn btn-primary px-8">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/cart" className="btn btn-ghost btn-sm">
              ← Back
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Checkout
            </h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {cartItems.length} items
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Phone Number *</span>
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

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Delivery Address *</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="123 Main Street, House #, Road #"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">City *</span>
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

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Delivery Area *</span>
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                  >
                    <option value="dhaka">Inside Dhaka (80৳)</option>
                    <option value="outside">Outside Dhaka (130৳)</option>
                  </select>
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Order Notes</span>
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full h-20"
                    placeholder="Any special instructions for delivery..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Summary & Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : 'text-gray-800 dark:text-white'}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Tax (5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-4">
                <label className="label">
                  <span className="label-text font-medium">Payment Method</span>
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="select select-bordered w-full"
                >
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.icon} {method.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {paymentMethods.find(p => p.id === paymentMethod)?.description}
                </p>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="btn btn-primary w-full mt-4 py-3 text-base"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  `Place Order • ${formatPrice(total)}`
                )}
              </button>

              {/* Trust Badges */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl">🔒</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Secure</p>
                  </div>
                  <div>
                    <div className="text-2xl">🚚</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fast Delivery</p>
                  </div>
                  <div>
                    <div className="text-2xl">🔄</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Easy Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animation */}
      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CheckOut;