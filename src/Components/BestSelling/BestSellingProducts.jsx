import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../../Context/CartContext';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaArrowRight,
  FaFire,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCheck
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { addToCart, isInCart } = useCart();

  // Fetch best selling products from JSON
  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/bestSelling.json');
        if (!response.ok) {
          throw new Error('Failed to fetch best selling products');
        }
        const data = await response.json();
        setProducts(data.bestSelling);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching best selling products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSelling();
  }, []);

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: 'top-right',
    });
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />);
    }
    return stars;
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

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

  // Error state
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
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
              <p className="text-orange-500 font-semibold uppercase tracking-wider text-sm">
                Best Selling
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Most Popular <span className="text-primary">Products</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, products.length)} of {products.length} products
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Link to="/cart" className="btn btn-primary btn-sm flex items-center gap-2">
              <FaShoppingCart /> View Cart
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div id="products-section">
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products available</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => {
                  const inCart = isInCart(product.id);
                  
                  return (
                    <div 
                      key={product.id}
                      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
                    >
                      {/* Image Section */}
                      <div className="relative overflow-hidden h-64 bg-gray-100 dark:bg-gray-700">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badge */}
                        {product.badge && (
                          <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                            {product.badge}
                          </div>
                        )}

                        {/* Out of Stock Overlay */}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg bg-red-500/90 px-6 py-3 rounded-full">
                              Out of Stock
                            </span>
                          </div>
                        )}

                        {/* Wishlist Button */}
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 p-2.5 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all shadow-md hover:scale-110"
                        >
                          {wishlist.includes(product.id) ? (
                            <FaHeart className="text-red-500 text-lg" />
                          ) : (
                            <FaRegHeart className="text-gray-600 dark:text-gray-300 text-lg" />
                          )}
                        </button>

                        {/* Sold Count */}
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <FaFire className="text-orange-400" />
                          <span>{product.soldCount.toLocaleString()} sold</span>
                        </div>

                        {/* In Cart Badge */}
                        {inCart && (
                          <div className="absolute top-3 right-16 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <FaCheck size={10} /> In Cart
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {product.brand}
                          </p>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {product.category}
                          </p>
                        </div>

                        <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-2 line-clamp-2 h-10">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {renderStars(product.rating)}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({product.reviews.toLocaleString()})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Button Group */}
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className={`w-full btn btn-sm rounded-full flex items-center justify-center gap-2 ${
                              !product.inStock 
                                ? 'btn-disabled opacity-50 cursor-not-allowed' 
                                : inCart 
                                  ? 'btn-success' 
                                  : 'btn-primary'
                            }`}
                            disabled={!product.inStock}
                          >
                            {inCart ? (
                              <>
                                <FaCheck /> In Cart
                              </>
                            ) : (
                              <>
                                <FaShoppingCart /> Add to Cart
                              </>
                            )}
                          </button>
                          
                          {/* View Cart Link - Only show when item is in cart */}
                          {inCart && (
                            <Link 
                              to="/cart"
                              className="text-center text-xs text-primary hover:text-primary-focus font-medium transition-colors underline underline-offset-2"
                            >
                              View Cart →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-10">
                  <button 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`btn btn-sm ${currentPage === 1 ? 'btn-disabled' : 'btn-outline'}`}
                  >
                    <FaChevronLeft /> Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentPage(index + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : 'btn-outline'}`}
                  >
                    Next <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;