// src/Admin/AddProducts/AddProducts.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { 
  FaSave, 
  FaTimes, 
  FaUpload, 
  FaTrash,
  FaImage,
  FaSpinner,
  FaPlus,
  FaMinus,
  FaTag
} from 'react-icons/fa';

const AddProducts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Smartphones',
    price: '',
    discountPrice: '',
    stock: '',
    rating: '',
    reviews: '',
    image: '',
    description: '',
    specifications: ''
  });

  // Categories with icons
  const categories = [
    { name: 'Smartphones', icon: '📱', color: 'bg-blue-100 text-blue-700' },
    { name: 'Laptops & Computers', icon: '💻', color: 'bg-purple-100 text-purple-700' },
    { name: 'Audio', icon: '🎧', color: 'bg-green-100 text-green-700' },
    { name: 'Wearables', icon: '⌚', color: 'bg-pink-100 text-pink-700' },
    { name: 'Gaming', icon: '🎮', color: 'bg-red-100 text-red-700' },
    { name: 'TV & Home Theater', icon: '📺', color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Cameras', icon: '📷', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Components', icon: '🔧', color: 'bg-cyan-100 text-cyan-700' }
  ];

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage
  const saveToLocalStorage = (productsData) => {
    localStorage.setItem('products', JSON.stringify(productsData));
    setProducts(productsData);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter product name');
      return false;
    }
    if (!formData.brand.trim()) {
      toast.error('Please enter brand name');
      return false;
    }
    if (!formData.category) {
      toast.error('Please select a category');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error('Please enter a valid price');
      return false;
    }
    if (!formData.stock || formData.stock < 0) {
      toast.error('Please enter valid stock quantity');
      return false;
    }
    if (!formData.image) {
      toast.error('Please upload a product image');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter product description');
      return false;
    }
    if (!formData.specifications.trim()) {
      toast.error('Please enter product specifications');
      return false;
    }
    return true;
  };

  // Get category icon
  const getCategoryIcon = (catName) => {
    const cat = categories.find(c => c.name === catName);
    return cat ? cat.icon : '📦';
  };

  // Handle form submit - Save to localStorage
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        stock: parseInt(formData.stock),
        rating: formData.rating ? parseFloat(formData.rating) : 0,
        reviews: formData.reviews ? parseInt(formData.reviews) : 0,
        categoryIcon: getCategoryIcon(formData.category),
        createdAt: new Date().toISOString()
      };

      const updatedProducts = [newProduct, ...products];
      saveToLocalStorage(updatedProducts);

      toast.success(`✅ Product added to ${formData.category}!`, {
        duration: 3000,
        position: 'top-right'
      });
      
      resetForm();
      navigate('/admin/products');
      
    } catch (error) {
      console.error('Add product error:', error);
      toast.error('Failed to add product. Please try again.', {
        duration: 3000,
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setFormData({
        name: '',
        brand: '',
        category: 'Smartphones',
        price: '',
        discountPrice: '',
        stock: '',
        rating: '',
        reviews: '',
        image: '',
        description: '',
        specifications: ''
      });
      setImagePreview(null);
      toast.success('Form cleared');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            ➕ Add New Product
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Fill in the details to add a new product to your store
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            💾 Products saved in local storage ({products.length} products total)
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetForm}
            className="btn btn-ghost btn-sm"
            disabled={loading}
          >
            <FaTimes className="mr-1" /> Clear
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Product Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Apple iPhone 16 Pro Max"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Brand *</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Apple"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Category *</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                    disabled={loading}
                  >
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Price (৳) *</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="1599"
                    min="0"
                    step="0.01"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Discount Price</span>
                  </label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="1499"
                    min="0"
                    step="0.01"
                    disabled={loading}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Stock Quantity *</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="25"
                    min="0"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Description *</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full h-24"
                    placeholder="Product description..."
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Specifications *
              </h2>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Product Specifications</span>
                  <span className="label-text-alt text-gray-500">(One per line)</span>
                </label>
                <textarea
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full h-48 font-mono text-sm"
                  placeholder={`Display: 6.9-inch OLED
Processor: A18 Pro
RAM: 8GB
Storage: 256GB
Camera: 48MP + 12MP + 12MP
Battery: 4685mAh
OS: iOS 26
Warranty: 1 Year`}
                  required
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Write each specification on a new line (e.g., Display: 6.9-inch OLED)
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Rating & Reviews
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Rating (0-5)</span>
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="4.9"
                    min="0"
                    max="5"
                    step="0.1"
                    disabled={loading}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Number of Reviews</span>
                  </label>
                  <input
                    type="number"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="385"
                    min="0"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Product Image *
              </h2>

              <div className="space-y-4">
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                        disabled={loading}
                      >
                        <FaTrash size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <FaImage className="text-5xl mb-2" />
                      <p className="text-sm">No image selected</p>
                    </div>
                  )}
                </div>

                <div className="form-control">
                  <label className={`btn btn-primary w-full cursor-pointer ${loading ? 'btn-disabled' : ''}`}>
                    <FaUpload className="mr-2" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Supported formats: JPG, PNG, WebP
                  </p>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Or Image URL</span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="https://example.com/image.jpg"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end sticky bottom-0 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="btn btn-ghost"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-ghost"
            disabled={loading}
          >
            <FaTimes className="mr-2" /> Clear Form
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary min-w-[150px]"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Adding...
              </>
            ) : (
              <>
                <FaSave className="mr-2" /> Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;