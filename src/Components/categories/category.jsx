import React, { useState, useEffect } from 'react';
import { useCart } from '../../Context/CartContext';
import { 
  FaMobileAlt, 
  FaLaptop, 
  FaHeadphones, 
  FaClock, 
  FaGamepad, 
  FaTv, 
  FaCamera, 
  FaMicrochip,
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaCheck
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const iconMap = {
  FaMobileAlt: <FaMobileAlt />,
  FaLaptop: <FaLaptop />,
  FaHeadphones: <FaHeadphones />,
  FaClock: <FaClock />,
  FaGamepad: <FaGamepad />,
  FaTv: <FaTv />,
  FaCamera: <FaCamera />,
  FaMicrochip: <FaMicrochip />
};

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, isInCart } = useCart();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/categories.json');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  // Update categories with actual product counts - FIXED
  useEffect(() => {
    if (Object.keys(products).length > 0 && categories.length > 0) {
      const updatedCategories = categories.map(category => {
        const categoryKey = category.name.toLowerCase().replace(/ & /g, '').replace(/ /g, '');
        const actualCount = products[categoryKey]?.length || 0;
        return {
          ...category,
          count: actualCount
        };
      });
      
      // Only update if counts have changed
      const hasCountChanged = categories.some((cat, index) => 
        cat.count !== updatedCategories[index].count
      );
      
      if (hasCountChanged) {
        setCategories(updatedCategories);
      }
    }
  }, [products]); // Remove categories from dependency array

  // Update products when category is selected
  useEffect(() => {
    if (selectedCategory && products) {
      const categoryKey = selectedCategory.name.toLowerCase().replace(/ & /g, '').replace(/ /g, '');
      const productsData = products[categoryKey] || [];
      setCategoryProducts(productsData);
    } else {
      setCategoryProducts([]);
    }
  }, [selectedCategory, products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      document.getElementById('products-section')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: 'top-right',
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
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

  if (error) {
    return (
      <div className="text-center py-20">
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
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <p className="text-primary font-semibold uppercase tracking-wider mb-2">
          Categories
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Browse by <span className="text-primary">Category</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover our wide range of products across different categories. 
          Find exactly what you're looking for.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`
              group relative cursor-pointer rounded-2xl p-6 
              bg-gradient-to-br ${category.color}
              text-white shadow-lg hover:shadow-2xl 
              transform transition-all duration-300 
              hover:scale-105 hover:-translate-y-1
              ${selectedCategory?.id === category.id ? 'ring-4 ring-primary ring-offset-2' : ''}
            `}
          >
            <div className="absolute top-3 right-3 text-white/30 group-hover:text-white/50 transition-colors">
              <FaArrowRight className="text-xl" />
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {iconMap[category.icon] || category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
              <span className="text-sm text-white/80">
                {category.count} Products
              </span>
            </div>

            <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div id="products-section" className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedCategory.name} Products
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Showing {categoryProducts.length} products
              </p>
            </div>
            <button 
              className="btn btn-ghost flex items-center gap-2 text-primary"
              onClick={() => setSelectedCategory(null)}
            >
              Clear Selection <span className="text-xl">✕</span>
            </button>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => {
                const inCart = isInCart(product.id);
                
                return (
                  <div 
                    key={product.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700"
                  >
                    <div className="relative overflow-hidden h-56 bg-gray-50 dark:bg-gray-900">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.brand}
                      </div>
                      {!product.inStock && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1 text-sm line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                      <p className="text-primary font-bold text-lg">
                        ${product.price}
                      </p>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`btn btn-primary btn-sm w-full mt-3 ${
                          !product.inStock ? 'btn-disabled opacity-50 cursor-not-allowed' : ''
                        } ${inCart ? 'btn-success' : ''}`}
                        disabled={!product.inStock}
                      >
                        {inCart ? (
                          <>
                            <FaCheck className="mr-2" /> In Cart
                          </>
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
      )}

      {!selectedCategory && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛍️</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Select a Category
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Click on any category above to view products
          </p>
        </div>
      )}
    </div>
  );
};

export default Category;