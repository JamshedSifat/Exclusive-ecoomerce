import React, { useContext, useState } from "react";
import { NavLink } from "react-router"; 
import { useCart } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthProvider";
import {
  FaShoppingCart,
  FaSignInAlt,
  FaUser,
  FaBoxOpen,
  FaSignOutAlt,
  FaChevronDown,
  FaLaptop,
  FaMobileAlt,
  FaHeadphones,
  FaTv,
  FaCamera,
  FaClock,
  FaGamepad,
  FaMicrochip,
} from "react-icons/fa";

const navlinks = [
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact" },
];

const categories = [
  {
    name: "Smartphones",
    path: "/category/smartphones",
    icon: <FaMobileAlt />,
    subCategories: [
      { name: "Apple iPhone", path: "/category/smartphones/apple" },
      { name: "Samsung Galaxy", path: "/category/smartphones/samsung" },
      { name: "Google Pixel", path: "/category/smartphones/google" },
      { name: "OnePlus", path: "/category/smartphones/oneplus" },
      { name: "Xiaomi", path: "/category/smartphones/xiaomi" },
      { name: "Accessories", path: "/category/smartphones/accessories" },
    ],
  },
  {
    name: "Laptops & Computers",
    path: "/category/laptops",
    icon: <FaLaptop />,
    subCategories: [
      { name: "Gaming Laptops", path: "/category/laptops/gaming" },
      { name: "Ultrabooks", path: "/category/laptops/ultrabooks" },
      { name: "MacBooks", path: "/category/laptops/macbook" },
      { name: "Desktop PCs", path: "/category/laptops/desktop" },
      { name: "Monitors", path: "/category/laptops/monitors" },
      { name: "Accessories", path: "/category/laptops/accessories" },
    ],
  },
  {
    name: "Audio",
    path: "/category/audio",
    icon: <FaHeadphones />,
    subCategories: [
      { name: "Wireless Headphones", path: "/category/audio/headphones" },
      { name: "Earbuds", path: "/category/audio/earbuds" },
      { name: "Speakers", path: "/category/audio/speakers" },
      { name: "Soundbars", path: "/category/audio/soundbars" },
      { name: "Audiophile Gear", path: "/category/audio/audiophile" },
    ],
  },
  {
    name: "Wearables",
    path: "/category/wearables",
    icon: <FaClock />,
    subCategories: [
      { name: "Smartwatches", path: "/category/wearables/smartwatches" },
      { name: "Fitness Trackers", path: "/category/wearables/fitness" },
      { name: "VR Headsets", path: "/category/wearables/vr" },
      { name: "Accessories", path: "/category/wearables/accessories" },
    ],
  },
  {
    name: "Gaming",
    path: "/category/gaming",
    icon: <FaGamepad />,
    subCategories: [
      { name: "Gaming Consoles", path: "/category/gaming/consoles" },
      { name: "Gaming PCs", path: "/category/gaming/pcs" },
      { name: "Gaming Accessories", path: "/category/gaming/accessories" },
      { name: "Gaming Chairs", path: "/category/gaming/chairs" },
      { name: "VR Gaming", path: "/category/gaming/vr" },
    ],
  },
  {
    name: "TV & Home Theater",
    path: "/category/tv",
    icon: <FaTv />,
    subCategories: [
      { name: "Smart TVs", path: "/category/tv/smart" },
      { name: "OLED TVs", path: "/category/tv/oled" },
      { name: "Projectors", path: "/category/tv/projectors" },
      { name: "Home Theater Systems", path: "/category/tv/home-theater" },
    ],
  },
  {
    name: "Cameras",
    path: "/category/cameras",
    icon: <FaCamera />,
    subCategories: [
      { name: "DSLR Cameras", path: "/category/cameras/dslr" },
      { name: "Mirrorless Cameras", path: "/category/cameras/mirrorless" },
      { name: "Action Cameras", path: "/category/cameras/action" },
      { name: "Lenses", path: "/category/cameras/lenses" },
      { name: "Accessories", path: "/category/cameras/accessories" },
    ],
  },
  {
    name: "Components",
    path: "/category/components",
    icon: <FaMicrochip />,
    subCategories: [
      { name: "Processors", path: "/category/components/processors" },
      { name: "Graphics Cards", path: "/category/components/graphics" },
      { name: "Motherboards", path: "/category/components/motherboards" },
      { name: "RAM", path: "/category/components/ram" },
      { name: "Storage", path: "/category/components/storage" },
      { name: "Power Supplies", path: "/category/components/psu" },
    ],
  },
];

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { getTotalItems } = useCart();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const handleLogout = () => {
    logOut().catch(console.error);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
          >
            {navlinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
            <li>
              <details>
                <summary>Categories</summary>
                <ul className="p-2">
                  {categories.map((cat) => (
                    <li key={cat.path}>
                      <details>
                        <summary className="flex items-center gap-2">
                          {cat.icon}
                          {cat.name}
                        </summary>
                        <ul className="p-2">
                          {cat.subCategories.map((sub) => (
                            <li key={sub.path}>
                              <NavLink to={sub.path}>{sub.name}</NavLink>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <NavLink to="/" className="text-2xl font-bold">
          Exclusive
        </NavLink>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          {navlinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "font-bold text-primary bg-primary/10 rounded-lg" : ""
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          <li className="dropdown dropdown-hover">
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-lg transition-all hover:bg-base-200"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              Categories <FaChevronDown size={12} className="ml-1" />
            </button>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72 z-[100]">
              {categories.map((cat) => (
                <li key={cat.path}>
                  <details>
                    <summary className="flex items-center gap-2">
                      {cat.icon}
                      {cat.name}
                    </summary>
                    <ul className="p-2 bg-base-100 rounded-box w-60">
                      {cat.subCategories.map((sub) => (
                        <li key={sub.path}>
                          <NavLink
                            to={sub.path}
                            className={({ isActive }) =>
                              isActive ? "text-primary font-bold" : ""
                            }
                          >
                            {sub.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-3">
        {/* Cart - Fixed: lowercase 'cart' */}
        <NavLink to="/cart" className="btn btn-ghost btn-circle relative">
          <div className="indicator">
            <FaShoppingCart size={20} />
            <span className="badge badge-primary badge-sm indicator-item">
              {getTotalItems()}
            </span>
          </div>
        </NavLink>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/Jj5t7mW/default-avatar.png"
                  }
                  alt="User"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-60"
            >
              <li className="pointer-events-none text-center font-bold py-2">
                {user.displayName || "User"}
              </li>

              <div className="divider my-1"></div>

              <li>
                <NavLink to="/profile">
                  <FaUser />
                  My Profile
                </NavLink>
              </li>

              <li>
                <NavLink to="/orders">
                  <FaBoxOpen />
                  My Orders
                </NavLink>
              </li>

              <li>
                <button onClick={handleLogout}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/auth/login" className="btn btn-primary">
            <FaSignInAlt />
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;