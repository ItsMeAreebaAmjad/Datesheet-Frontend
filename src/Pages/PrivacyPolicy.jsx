import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 text-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Learn about how we collect, use, and protect your information while using our DateSheet Generator System.
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We collect information you provide directly to us, such as when you generate a datesheet, fill out forms, or interact with our system.
              This may include your name, email address, academic details, and other relevant information.
            </p>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your information is used to generate accurate and customized datesheets, improve our services, communicate with you, and ensure the security of our platform. We do not share your information without your consent.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at
              <a
                href="mailto:support@datesheetgenerator.com"
                className="text-blue-600 font-medium underline ml-1"
              >
                support@datesheetgenerator.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
