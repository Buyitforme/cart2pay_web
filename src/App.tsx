import { Toaster } from "react-hot-toast";
import Router from "./Navigation/Router";
import { Provider } from "react-redux";
import store from "./redux/state";
import CookieConsent from "./services/CookiesConscent";

function App() {
  return (
    <div className="bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
