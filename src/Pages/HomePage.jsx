import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 text-white">
      {/* Header Section */}
      <header className="py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to DateSheet Generator System
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Create, manage, and optimize exam schedules effortlessly.
            </p>
          </motion.div>
          <motion.button
            className="mt-6 md:mt-0 bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-gray-100 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/create-datesheet")}
          >
            Get Started
          </motion.button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white text-blue-700 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
                    <i
                      className={`${
                        i === 0
                          ? "fas fa-calendar-alt"
                          : i === 1
                          ? "fas fa-clock"
                          : "fas fa-check-circle"
                      } text-2xl`}
                    ></i>
                  </div>
                  <h3 className="ml-4 text-xl font-semibold">
                    {i === 0
                      ? "Automated DateSheet Generation"
                      : i === 1
                      ? "Conflict-Free Scheduling"
                      : "Instant Modifications"}
                  </h3>
                </div>
                <p>
                  {i === 0
                    ? "Generate exam schedules efficiently with just a few clicks."
                    : i === 1
                    ? "Ensures no overlapping of exams for students and faculty."
                    : "Easily make adjustments and updates in real-time."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-900 py-16 px-6 md:px-12">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simplify Exam Scheduling Now!
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Join institutions in optimizing their examination management system.
          </p>
          <motion.button
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/create-datesheet")}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 md:px-12 bg-indigo-800 text-gray-200">
        <motion.div
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p>&copy; 2024 DateSheet Generator. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-gray-300 hover:text-white mx-2">
              Privacy Policy
            </a>
            <a href="/term-service" className="text-gray-300 hover:text-white mx-2">
              Terms of Service
            </a>
            <a href="/contact-us" className="text-gray-300 hover:text-white mx-2">
              Contact Us
            </a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Home;
