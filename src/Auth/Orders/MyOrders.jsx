import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  FaBox, 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaPrint,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaRegStar,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaArrowLeft,
  FaShoppingBag, // Changed from FaPackage
  FaBoxOpen      // Added as alternative
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  // Mock orders data - In real app, fetch from API
  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockOrders = [
          {
            id: 'ORD-2024-001',
            date: '2024-01-15',
            total: 2499.00,
            status: 'delivered',
            paymentMethod: 'bKash',
            items: [
              { id: 1, name: 'iPhone 15 Pro Max', quantity: 1, price: 1199.99, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100' },
              { id: 2, name: 'AirPods Pro 2', quantity: 1, price: 249.99, image: 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=100' }
            ],
            shipping: {
              address: '123 Main Street, Dhaka, Bangladesh',
              tracking: 'TRK-123456789',
              courier: 'Pathao',
              estimatedDelivery: '2024-01-20'
            },
            timeline: [
              { status: 'Order Placed', date: '2024-01-15 10:30 AM', completed: true },
              { status: 'Processing', date: '2024-01-15 02:00 PM', completed: true },
              { status: 'Shipped', date: '2024-01-16 09:00 AM', completed: true },
              { status: 'Delivered', date: '2024-01-18 04:30 PM', completed: true }
            ]
          },
          {
            id: 'ORD-2024-002',
            date: '2024-01-12',
            total: 399.99,
            status: 'shipped',
            paymentMethod: 'Cash on Delivery',
            items: [
              { id: 3, name: 'Sony WH-1000XM5', quantity: 1, price: 399.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' }
            ],
            shipping: {
              address: '456 Park Avenue, Chittagong, Bangladesh',
              tracking: 'TRK-987654321',
              courier: 'RedX',
              estimatedDelivery: '2024-01-22'
            },
            timeline: [
              { status: 'Order Placed', date: '2024-01-12 08:45 AM', completed: true },
              { status: 'Processing', date: '2024-01-12 01:30 PM', completed: true },
              { status: 'Shipped', date: '2024-01-13 10:00 AM', completed: true },
              { status: 'Delivered', date: '2024-01-22 05:00 PM', completed: false }
            ]
          },
          {
            id: 'ORD-2024-003',
            date: '2024-01-10',
            total: 1099.99,
            status: 'processing',
            paymentMethod: 'Nagad',
            items: [
              { id: 4, name: 'MacBook Pro 16"', quantity: 1, price: 2499.99, image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=100' }
            ],
            shipping: {
              address: '789 Lake Road, Sylhet, Bangladesh',
              tracking: 'TRK-456789123',
              courier: 'Sundarban',
              estimatedDelivery: '2024-01-25'
            },
            timeline: [
              { status: 'Order Placed', date: '2024-01-10 11:20 AM', completed: true },
              { status: 'Processing', date: '2024-01-10 03:45 PM', completed: true },
              { status: 'Shipped', date: '2024-01-25 08:00 AM', completed: false },
              { status: 'Delivered', date: '2024-01-28 06:00 PM', completed: false }
            ]
          },
          {
            id: 'ORD-2024-004',
            date: '2024-01-08',
            total: 159.99,
            status: 'pending',
            paymentMethod: 'Rocket',
            items: [
              { id: 5, name: 'Fitbit Charge 6', quantity: 1, price: 159.99, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100' }
            ],
            shipping: {
              address: '321 Hill View, Cox\'s Bazar, Bangladesh',
              tracking: 'TRK-789123456',
              courier: 'Paperfly',
              estimatedDelivery: '2024-01-30'
            },
            timeline: [
              { status: 'Order Placed', date: '2024-01-08 09:15 AM', completed: true },
              { status: 'Processing', date: '2024-01-30 08:00 AM', completed: false },
              { status: 'Shipped', date: '2024-02-01 09:00 AM', completed: false },
              { status: 'Delivered', date: '2024-02-05 06:00 PM', completed: false }
            ]
          },
          {
            id: 'ORD-2024-005',
            date: '2024-01-05',
            total: 689.99,
            status: 'cancelled',
            paymentMethod: 'bKash',
            items: [
              { id: 6, name: 'Samsung Galaxy S24 Ultra', quantity: 1, price: 1099.99, image: 'https://images.unsplash.com/photo-1610945265064-0e34e3b1f0f6?w=100' }
            ],
            shipping: {
              address: '654 Ocean Drive, Barishal, Bangladesh',
              tracking: 'TRK-321654987',
              courier: 'Pathao',
              estimatedDelivery: '2024-01-15'
            },
            timeline: [
              { status: 'Order Placed', date: '2024-01-05 02:30 PM', completed: true },
              { status: 'Processing', date: '2024-01-05 04:00 PM', completed: true },
              { status: 'Cancelled', date: '2024-01-06 10:00 AM', completed: true }
            ]
          }
        ];

        setOrders(mockOrders);
      } catch (error) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { color: 'badge-success', icon: <FaCheckCircle />, text: 'Delivered' },
      shipped: { color: 'badge-info', icon: <FaTruck />, text: 'Shipped' },
      processing: { color: 'badge-warning', icon: <FaClock />, text: 'Processing' },
      pending: { color: 'badge-ghost', icon: <FaBox />, text: 'Pending' },
      cancelled: { color: 'badge-error', icon: <FaTimesCircle />, text: 'Cancelled' }
    };
    return statusConfig[status] || statusConfig.pending;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Close order details
  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  // Cancel order
  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
      toast.success('Order cancelled successfully');
    }
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? 
          <FaStar key={i} className="text-yellow-400" /> : 
          <FaRegStar key={i} className="text-yellow-400" />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <FaBox className="text-primary" />
              My Orders
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-ghost btn-sm mt-4 sm:mt-0"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="select select-bordered"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {currentOrders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || filterStatus !== 'all' ? 
                'Try adjusting your search or filter criteria' : 
                'You haven\'t placed any orders yet'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link to="/" className="btn btn-primary mt-4">
                Start Shopping
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {currentOrders.map((order) => {
              const status = getStatusBadge(order.status);
              
              return (
                <div 
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Order Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                      <p className="font-bold text-gray-800 dark:text-white">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{formatDate(order.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                      <p className="font-bold text-primary">{formatCurrency(order.total)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`badge ${status.color} gap-2`}>
                        {status.icon} {status.text}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="btn btn-ghost btn-sm"
                      >
                        <FaEye /> Details
                      </button>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="btn btn-error btn-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="p-4 flex flex-wrap gap-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center text-sm text-gray-500">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-ghost"
                >
                  <FaChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-ghost"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Order Details
                </h3>
                <button
                  onClick={closeOrderDetails}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                    <p className="font-bold text-gray-800 dark:text-white">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{formatDate(selectedOrder.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Payment</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                    <p className="font-bold text-primary">{formatCurrency(selectedOrder.total)}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-primary">{formatCurrency(item.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Info */}
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Shipping Information</h4>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-2">
                    <p className="text-gray-600 dark:text-gray-400">{selectedOrder.shipping.address}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span><strong>Courier:</strong> {selectedOrder.shipping.courier}</span>
                      <span><strong>Tracking:</strong> {selectedOrder.shipping.tracking}</span>
                      <span><strong>Est. Delivery:</strong> {formatDate(selectedOrder.shipping.estimatedDelivery)}</span>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Order Timeline</h4>
                  <div className="space-y-3">
                    {selectedOrder.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${event.completed ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                          {index < selectedOrder.timeline.length - 1 && (
                            <div className={`w-0.5 h-8 ${event.completed ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                          )}
                        </div>
                        <div>
                          <p className={`font-semibold ${event.completed ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>
                            {event.status}
                          </p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="btn btn-ghost btn-sm">
                    <FaPrint /> Print Order
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <FaDownload /> Download Invoice
                  </button>
                  {selectedOrder.status === 'delivered' && (
                    <button className="btn btn-primary btn-sm">
                      <FaStar className="mr-1" /> Leave Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;