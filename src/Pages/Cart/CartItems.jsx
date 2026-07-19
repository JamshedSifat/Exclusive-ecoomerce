import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; // Changed from 'react-router' to 'react-router-dom'
import { useCart } from '../../Context/CartContext';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaArrowLeft,
  FaCreditCard,
  FaLock,
  FaGift,
  FaTruck,
  FaTimes
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const CartItems = () => {
  const navigate = useNavigate(); // Added useNavigate hook
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getTotalPrice 
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantityHandler = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const removeItemHandler = (id, name) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`, {
      duration: 3000,
      position: 'top-right',
    });
  };

  const clearCartHandler = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared successfully', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscount(20);
      setPromoApplied(true);
      toast.success('Promo code applied! 20% off', {
        duration: 3000,
        position: 'top-right',
      });
    } else if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(10);
      setPromoApplied(true);
      toast.success('Promo code applied! 10% off', {
        duration: 3000,
        position: 'top-right',
      });
    } else {
      toast.error('Invalid promo code. Try SAVE10 or SAVE20', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  const removePromo = () => {
    setDiscount(0);
    setPromoApplied(false);
    setPromoCode('');
    toast.success('Promo code removed', {
      duration: 3000,
      position: 'top-right',
    });
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }
    navigate('/checkout');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 100 ? 0 : 15.99;
  const tax = subtotal * 0.07;
  const total = subtotal - discountAmount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center py-16">
        <div className="text-7xl mb-6">🛒</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/" className="btn btn-primary px-8">
          <FaArrowLeft className="mr-2" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <Link to="/" className="btn btn-ghost btn-sm flex items-center gap-2">
            <FaArrowLeft /> Continue Shopping
          </Link>
          <button onClick={clearCartHandler} className="btn btn-error btn-sm flex items-center gap-2">
            <FaTrash /> Clear Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-1 text-center">Total</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <div className="col-span-1 md:col-span-6 flex items-start gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {item.brand} • {item.category}
                    </p>
                    {item.color && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Color: {item.color}
                      </p>
                    )}
                    {item.storage && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Storage: {item.storage}
                      </p>
                    )}
                    <p className="md:hidden text-sm font-semibold text-primary mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex col-span-2 items-center justify-center text-gray-800 dark:text-white font-medium">
                  {formatPrice(item.price)}
                </div>

                <div className="col-span-1 md:col-span-2 flex items-center justify-center">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantityHandler(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantityHandler(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                <div className="hidden md:flex col-span-1 items-center justify-center font-bold text-primary">
                  {formatPrice(item.price * item.quantity)}
                </div>

                <div className="col-span-1 md:col-span-1 flex items-center justify-end md:justify-center">
                  <button 
                    onClick={() => removeItemHandler(item.id, item.name)}
                    className="btn btn-ghost btn-sm btn-circle text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="md:hidden col-span-12 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3 mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-96">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 input input-bordered input-sm dark:bg-gray-700 dark:border-gray-600"
                  disabled={promoApplied}
                />
                <button 
                  onClick={applyPromo}
                  className="btn btn-primary btn-sm"
                  disabled={promoApplied || !promoCode}
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <div className="flex items-center gap-2 mt-2 text-green-600 dark:text-green-400 text-sm">
                  <span>✓ Promo applied!</span>
                  <button onClick={removePromo} className="text-red-500 hover:text-red-700">
                    <FaTimes />
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Try: SAVE10 or SAVE20
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount ({discount}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (7%)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Updated Checkout Button */}
            <button 
              onClick={handleCheckout}
              className="btn btn-primary w-full mt-6 py-3 text-base"
            >
              <FaCreditCard className="mr-2" /> Proceed to Checkout
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <FaLock className="text-gray-400 text-lg" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Secure Payment
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <FaTruck className="text-gray-400 text-lg" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Free Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <FaGift className="text-gray-400 text-lg" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Gift Options
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;