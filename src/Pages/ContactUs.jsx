import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Contact Us</h1>
        <p className="text-lg leading-relaxed text-gray-600 mb-8">
          Have any questions about the DateSheet Generator System? Need support or 
          want to provide feedback? We’d love to hear from you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Reach Out
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center">
                <i className="fas fa-phone-alt text-blue-500 text-xl mr-4"></i>
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-blue-500 text-xl mr-4"></i>
                <a
                  href="mailto:support@datesheetgenerator.com"
                  className="text-blue-500 hover:underline"
                >
                  support@datesheetgenerator.com
                </a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-blue-500 text-xl mr-4"></i>
                <span>123 University Road, Academic City</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
