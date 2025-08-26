import { useState, useEffect } from "react";
import Cookies from "js-cookie";

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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-50">
      <span>
        We use cookies to enhance your experience. By continuing, you agree to
        our use of cookies.
      </span>
      <button
        onClick={handleAccept}
        className="ml-4 bg-blue-500 px-4 py-2 rounded"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
