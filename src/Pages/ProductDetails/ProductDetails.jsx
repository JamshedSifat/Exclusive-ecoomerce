// src/Pages/ProductDetails/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { 
  FaArrowLeft, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaMinus,
  FaPlus,
  FaShare,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaTag,
  FaCheckCircle,
  FaStore
} from 'react-icons/fa';
import { useCart } from '../../Context/CartContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [wishlist, setWishlist] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Load product from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      const foundProduct = products.find(p => p.id === parseInt(id));
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image);
        
        // Find related products (same category)
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        toast.error('Product not found');
        navigate('/products');
      }
    }
    setLoading(false);
  }, [id, navigate]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        quantity: quantity
      };
      addToCart(cartItem);
      toast.success(`${product.name} added to cart!`, {
        duration: 3000,
        position: 'top-right'
      });
    }
  };

  // Handle quantity change
  const increaseQuantity = () => {
    if (quantity < product?.stock) {
      setQuantity(prev => prev + 1);
    } else {
      toast.error('Not enough stock available');
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setWishlist(!wishlist);
    toast.success(wishlist ? 'Removed from wishlist' : 'Added to wishlist');
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

  // Parse specifications
  const parseSpecifications = (specs) => {
    if (!specs) return [];
    return specs.split('\n').filter(line => line.trim());
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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The product you're looking for doesn't exist.
        </p>
        <Link to="/products" className="btn btn-primary">
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>
      </div>
    );
  }

  const specifications = parseSpecifications(product.specifications);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <span className="text-gray-800 dark:text-white">{product.name}</span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost btn-sm mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Images */}
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden h-96">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[product.image, ...(product.extraImages || [])].slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  selectedImage === img ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
              {product.category}
            </span>
            {product.discountPrice && (
              <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                SAVE {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            {product.name}
          </h1>

          {/* Brand */}
          <p className="text-gray-600 dark:text-gray-400">
            Brand: <span className="font-semibold text-gray-800 dark:text-white">{product.brand}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-500 dark:text-gray-400">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.discountPrice || product.price)}
            </span>
            {product.discountPrice && (
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <FaCheckCircle className="text-green-500" />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  In Stock ({product.stock} available)
                </span>
              </>
            ) : (
              <span className="text-red-600 dark:text-red-400 font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          {specifications.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Specifications</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
                {specifications.map((spec, index) => {
                  const [key, ...valueParts] = spec.split(':');
                  const value = valueParts.join(':').trim();
                  return (
                    <div key={index} className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{key.trim()}</span>
                      <span className="text-gray-600 dark:text-gray-400">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <span className="font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={decreaseQuantity}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition"
                disabled={quantity <= 1}
              >
                <FaMinus size={12} />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition"
                disabled={quantity >= product.stock}
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 btn btn-primary py-3 text-base ${
                product.stock === 0 ? 'btn-disabled opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaShoppingCart className="mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={toggleWishlist}
              className="btn btn-ghost btn-square text-xl"
            >
              {wishlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
            <button className="btn btn-ghost btn-square text-xl">
              <FaShare />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <FaTruck className="text-primary text-xl" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white text-sm">Free Shipping</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">On orders over 5000৳</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <FaUndo className="text-primary text-xl" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white text-sm">Easy Returns</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">7 days return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <FaShieldAlt className="text-primary text-xl" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white text-sm">Secure Payment</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className="h-40 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-primary font-bold">
                    {formatPrice(item.discountPrice || item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;