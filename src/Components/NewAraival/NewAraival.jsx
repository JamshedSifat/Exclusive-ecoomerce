import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../../Context/CartContext';
import { 
  FaArrowRight, 
  FaTag, 
  FaTimes,
  FaShoppingCart,
  FaCheck
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const NewArrival = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/newArrival.json');
        if (!response.ok) {
          throw new Error('Failed to fetch new arrivals');
        }
        const data = await response.json();
        setItems(data.newArrivals);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching new arrivals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // Toggle show all products
  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setTimeout(() => {
        document.getElementById('new-arrival-section')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = (item) => {
    const product = {
      id: item.id,
      name: item.title,
      price: item.price || 99.99,
      image: item.image,
      brand: item.brand || 'Brand',
      category: item.category || 'General',
      inStock: true,
      quantity: 1
    };
    
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: 'top-right',
    });
  };

  // Get displayed items (first 4 or all)
  const displayedItems = showAll ? items : items.slice(0, 4);

  // Loading state
  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-100"></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h3>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
            <div>
              <p className="text-orange-500 font-semibold uppercase tracking-wider text-sm">
                Featured
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                New Arrival
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {showAll 
                  ? `Showing all ${items.length} products` 
                  : `Showing ${Math.min(4, items.length)} of ${items.length} products`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            {showAll && (
              <button 
                onClick={toggleShowAll}
                className="btn btn-ghost btn-sm flex items-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <FaTimes /> Show Less
              </button>
            )}
            <button 
              onClick={toggleShowAll}
              className="btn btn-primary btn-sm flex items-center gap-2"
            >
              {showAll ? 'Show Less' : 'View All'} 
              {!showAll && <FaArrowRight />}
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div id="new-arrival-section">
          {displayedItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayedItems.map((item, index) => {
                const inCart = isInCart(item.id);
                
                return (
                  <div 
                    key={item.id}
                    className={`relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                      index === 0 && !showAll ? 'md:col-span-2 md:row-span-2' : ''
                    } ${showAll ? 'md:col-span-1 md:row-span-1' : ''}`}
                  >
                    <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${
                      index === 0 && !showAll ? 'h-80 md:h-96' : 'h-64 md:h-72 lg:h-80'
                    }`}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Badge */}
                      <div className={`absolute top-4 left-4 ${item.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1`}>
                        <FaTag size={10} />
                        {item.badge}
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        {item.brand && (
                          <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                            {item.brand}
                          </p>
                        )}
                        <h3 className={`font-bold mb-2 line-clamp-2 ${
                          index === 0 && !showAll ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                        }`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm text-white/80 mb-4 line-clamp-2 ${
                          index === 0 && !showAll ? 'text-base' : ''
                        }`}>
                          {item.subtitle}
                        </p>
                        
                        {/* Button Group */}
                        <div className="flex flex-wrap items-center gap-3">
                          <button 
                            onClick={() => handleAddToCart(item)}
                            className={`bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                              inCart 
                                ? 'bg-green-500 text-white hover:bg-green-600' 
                                : 'hover:bg-primary hover:text-white'
                            }`}
                          >
                            {inCart ? (
                              <>
                                <FaCheck size={14} /> In Cart
                              </>
                            ) : (
                              <>
                                <FaShoppingCart size={14} /> Add to Cart
                              </>
                            )}
                          </button>
                          
                          {/* View Cart Link - Only show when item is in cart */}
                          {inCart && (
                            <Link 
                              to="/cart"
                              className="text-white/80 hover:text-white text-sm font-medium transition-colors underline underline-offset-2"
                            >
                              View Cart →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* View All Button - Mobile */}
        {!showAll && items.length > 4 && (
          <div className="text-center mt-10 sm:hidden">
            <button 
              onClick={toggleShowAll}
              className="btn btn-primary px-8 flex items-center gap-2 mx-auto"
            >
              View All New Arrivals <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrival;