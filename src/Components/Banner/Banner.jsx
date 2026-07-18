import React from "react";

const Banner = () => {
  return (
    <div className="carousel w-full rounded-2xl mt-6 shadow-2xl border border-blue-900/30">

      {/* Slide 1 - Deep Blue & Black */}
      <div id="slide1" className="carousel-item relative w-full">
        <div className="hero min-h-[500px] bg-gradient-to-br from-[#0a0f1e] via-[#111d3a] to-[#1a3a7a] text-white">
          <div className="hero-content flex-col lg:flex-row-reverse justify-between w-full px-10">

            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700"
              className="max-w-sm rounded-xl shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-blue-500/20"
              alt="Phone"
            />

            <div className="max-w-xl">
              <p className="uppercase tracking-widest font-semibold text-blue-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full inline-block mr-2"></span>
                New Arrival
              </p>

              <h1 className="text-5xl font-bold mt-3 leading-tight">
                Discover the Latest <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                  Tech Gadgets
                </span>
              </h1>

              <p className="py-6 text-lg opacity-90 text-blue-100">
                Upgrade your lifestyle with premium smartphones,
                laptops, headphones, smartwatches, and accessories.
              </p>

              <button className="btn bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all">
                Shop Now <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle bg-black/50 backdrop-blur-sm border border-blue-500/30 text-white hover:bg-blue-700 hover:border-blue-400">❮</a>
          <a href="#slide2" className="btn btn-circle bg-black/50 backdrop-blur-sm border border-blue-500/30 text-white hover:bg-blue-700 hover:border-blue-400">❯</a>
        </div>
      </div>

      {/* Slide 2 - Dark Blue & Black */}
      <div id="slide2" className="carousel-item relative w-full">
        <div className="hero min-h-[500px] bg-gradient-to-br from-[#05080f] via-[#0d1b33] to-[#1a2d5a] text-white">
          <div className="hero-content flex-col lg:flex-row-reverse justify-between w-full px-10">

            <img
              src="https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=700"
              className="max-w-sm rounded-xl shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-blue-500/20"
              alt="Laptop"
            />

            <div className="max-w-xl">
              <p className="uppercase tracking-widest font-semibold text-blue-400">
                Best Seller
              </p>

              <h1 className="text-5xl font-bold mt-3">
                Powerful Gaming
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Laptops</span>
              </h1>

              <p className="py-6 text-lg text-blue-100">
                Experience high performance with the latest gaming
                laptops and accessories.
              </p>

              <button className="btn bg-blue-700 hover:bg-blue-800 text-white border-none shadow-lg shadow-blue-700/30 hover:shadow-blue-700/50 transition-all">
                Explore Now <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle bg-black/50 backdrop-blur-sm border border-blue-500/30 text-white hover:bg-blue-700 hover:border-blue-400">❮</a>
          <a href="#slide3" className="btn btn-circle bg-black/50 backdrop-blur-sm border border-blue-500/30 text-white hover:bg-blue-700 hover:border-blue-400">❯</a>
        </div>
      </div>

      {/* Slide 3 - Electric Blue & Black */}
      <div id="slide3" className="carousel-item relative w-full">
        <div className="hero min-h-[500px] bg-gradient-to-br from-[#0a1628] via-[#142a5e] to-[#1e4a8a] text-white">
          <div className="hero-content flex-col lg:flex-row-reverse justify-between w-full px-10">

            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700"
              className="max-w-sm rounded-xl shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-blue-500/20"
              alt="Headphone"
            />

            <div className="max-w-xl">
              <p className="uppercase tracking-widest font-semibold text-blue-300">
                Limited Offer
              </p>

              <h1 className="text-5xl font-bold mt-3">
                Up to 50% OFF
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Audio Devices</span>
              </h1>

              <p className="py-6 text-lg text-blue-100">
                Shop premium wireless headphones, earbuds,
                speakers, and more at amazing prices.
              </p>

              <button className="btn bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-none shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all">
                Grab Deal <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle bg-black/50 backdrop-blur-sm border border-blue-500/30 text-white hover:bg-blue-700 hover:border-blue-400">❮</a>
          <a href="#slide1" className="btn btn-circle bg-black/50 backdrop-blur-sm border border-blue-500/30 text-white hover:bg-blue-700 hover:border-blue-400">❯</a>
        </div>
      </div>

    </div>
  );
};

export default Banner;