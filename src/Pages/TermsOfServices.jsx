import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 text-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Terms of Service</h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to the DateSheet Generator System. By using our services, you agree to comply
          with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Acceptance of Terms
        </h2>
        <p className="mb-6">
          By accessing or using our DateSheet Generator System, you agree to these terms. If you
          do not agree, you may not use our services.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Modifications to Terms
        </h2>
        <p className="mb-6">
          We may update these terms from time to time to reflect changes in our services or policies. 
          Any modifications will be communicated through our website.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          User Responsibilities
        </h2>
        <p className="mb-6">
          Users are responsible for ensuring that the information provided for generating 
          date sheets is accurate and up-to-date. Misuse of the system may result in account suspension.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Service Availability
        </h2>
        <p className="mb-6">
          We strive to keep the DateSheet Generator System accessible at all times. However, 
          we do not guarantee uninterrupted service and may perform maintenance as needed.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Limitations of Liability
        </h2>
        <p className="mb-6">
          The DateSheet Generator System is provided "as is" without warranties of any kind. 
          We are not responsible for errors, inaccuracies, or disruptions in service.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Contact Information
        </h2>
        <p>
          If you have any questions about these terms, please contact us at{" "}
          <a
            href="mailto:support@datesheetgenerator.com"
            className="text-blue-500 hover:underline"
          >
            support@datesheetgenerator.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
