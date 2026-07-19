// src/Pages/Products/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../../Context/CartContext';
import { 
  FaSearch, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaCheck
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const { addToCart, isInCart } = useCart(); // ✅ Add cart context

  // Categories with icons
  const categories = [
    { name: 'All', icon: '📦' },
    { name: 'Smartphones', icon: '📱' },
    { name: 'Laptops & Computers', icon: '💻' },
    { name: 'Audio', icon: '🎧' },
    { name: 'Wearables', icon: '⌚' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'TV & Home Theater', icon: '📺' },
    { name: 'Cameras', icon: '📷' },
    { name: 'Components', icon: '🔧' }
  ];

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setFilteredProducts(JSON.parse(savedProducts));
    }
    setLoading(false);
  }, []);

  // Filter products
  useEffect(() => {
    let result = products;
    
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast.success(wishlist.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // Add to cart with real cart context
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: 'top-right'
    });
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Render stars
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          🛍️ Our Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Discover our collection of {products.length} products
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name === 'All' ? 'all' : cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                (cat.name === 'All' && selectedCategory === 'all') || selectedCategory === cat.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No Products Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? 'Try searching with different keywords' : 'No products available in this category'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inCart = isInCart(product.id); // ✅ Check if product is in cart
            
            return (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Image - Clickable to product details */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-56 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.category}
                    </div>
                    {product.discountPrice && (
                      <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                    {product.stock < 10 && product.stock > 0 && (
                      <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Only {product.stock} left
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg bg-red-500/90 px-6 py-3 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition shadow-md"
                >
                  {wishlist.includes(product.id) ? (
                    <FaHeart className="text-red-500 text-lg" />
                  ) : (
                    <FaRegHeart className="text-gray-600 dark:text-gray-300 text-lg" />
                  )}
                </button>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {product.brand}
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {product.categoryIcon} {product.category}
                    </span>
                  </div>

                  {/* Product Name - Clickable */}
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-base mb-1 line-clamp-2 h-12 hover:text-primary transition">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(product.discountPrice || product.price)}
                    </span>
                    {product.discountPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full btn ${inCart ? 'btn-success' : 'btn-primary'} ${product.stock === 0 ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {inCart ? (
                      <>
                        <FaCheck className="mr-2" /> In Cart
                      </>
                    ) : product.stock === 0 ? (
                      'Out of Stock'
                    ) : (
                      <>
                        <FaShoppingCart className="mr-2" /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;