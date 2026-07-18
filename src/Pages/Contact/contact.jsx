import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-base-100">

      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg opacity-90">
            Have questions about your order or our products? Our support team is
            always ready to help you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left */}
          <div className="space-y-6">

            <h2 className="text-4xl font-bold">
              Get In <span className="text-primary">Touch</span>
            </h2>

            <p className="text-gray-500">
              We'd love to hear from you. Reach out through any of the
              following ways.
            </p>

            <div className="space-y-5">

              <div className="flex gap-5 items-start bg-base-200 p-5 rounded-xl">
                <div className="bg-primary text-white p-4 rounded-full">
                  <FaMapMarkerAlt size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Our Office</h3>
                  <p className="text-gray-500">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start bg-base-200 p-5 rounded-xl">
                <div className="bg-primary text-white p-4 rounded-full">
                  <FaPhoneAlt size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-gray-500">
                    +880 1234-567890
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start bg-base-200 p-5 rounded-xl">
                <div className="bg-primary text-white p-4 rounded-full">
                  <FaEnvelope size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-500">
                    support@exclusive.com
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start bg-base-200 p-5 rounded-xl">
                <div className="bg-primary text-white p-4 rounded-full">
                  <FaClock size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Business Hours</h3>
                  <p className="text-gray-500">
                    Sunday - Thursday
                  </p>
                  <p className="text-gray-500">
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right */}
          <div className="bg-base-200 rounded-2xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Send Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
              />

              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full"
              ></textarea>

              <button className="btn btn-primary w-full text-white">
                Send Message
              </button>

            </form>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;