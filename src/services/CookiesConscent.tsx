import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import routeNames from "../Navigation/RouteNames";


const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user already accepted cookies
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 }); // store for 1 year
    setVisible(false);
  };

  if (!visible) return null;

return (
  <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-md z-50">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <span className="text-sm sm:text-base">
        We use cookies to enhance your experience. By continuing, you agree to
        our use of cookies.{" "}
        <Link
          to={routeNames.cookiePolicy}
          className="text-blue-400 hover:text-blue-300 cursor-pointer underline"
        >
          Learn more
        </Link>
      </span>
      <button
        onClick={handleAccept}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded whitespace-nowrap text-sm sm:text-base transition-colors flex-shrink-0"
      >
        Accept
      </button>
    </div>
  </div>
);
};

export default CookieConsent;
