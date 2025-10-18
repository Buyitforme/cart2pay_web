import React from "react";

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-accent  py-8 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className=" bg-white rounded-lg shadow-sm border border-gray-200 rounded-lg shadow-sm  p-6 sm:p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Cookie Policy
            </h1>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
            We use cookies to enhance your experience on our website. Cookies
            are small text files that are stored on your device when you visit
            our website. They allow us to recognize you and provide a better
            experience.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Types of Cookies */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                1
              </span>
              Types of Cookies We Use
            </h2>
            <div className="space-y-4">
              <div className=" pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Essential Cookies
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  These cookies are necessary for the website to function
                  properly. They enable core functionality such as security,
                  network management, and accessibility.
                </p>
              </div>
              <div className=" pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Performance Cookies
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  These cookies help us understand how visitors interact with
                  our website. They collect anonymous data about page views,
                  bounce rates, and other metrics.
                </p>
              </div>
              <div className=" pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Functional Cookies
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  These cookies remember your preferences and settings, allowing
                  us to provide a more personalized experience.
                </p>
              </div>
            </div>
          </div>

          {/* How We Use Cookies */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              How We Use Cookies
            </h2>
            <p className="text-gray-600 mb-4">We use cookies to:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">
                  Recognize you when you return to our website
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">
                  Improve your browsing experience
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">
                  Analyze website traffic and usage
                </span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-700 text-sm">
                  Provide personalized content and advertising
                </span>
              </div>
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              Managing Cookies
            </h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                You can manage your cookie preferences by adjusting your browser
                settings. Most browsers allow you to refuse cookies or delete
                existing cookies. However, please note that disabling cookies
                may affect the functionality of our website.
              </p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              Changes to Our Cookie Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update our cookie policy from time to time. Any changes
              will be reflected on this page, and we encourage you to review our
              policy periodically.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-accent from-blue-600  rounded-lg shadow-sm  p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              Contact Us
            </h2>
            <p className="mb-4 ">
              If you have any questions or concerns about our cookie policy,
              please contact us:
            </p>
            <div className="inline-flex items-center bg-white bg-opacity-10 rounded-lg px-4 py-2 border border-white border-opacity-20">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <a
                href="mailto:support@shopviacal.com?subject=Support Request"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
              >
                support@shopviacal.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
