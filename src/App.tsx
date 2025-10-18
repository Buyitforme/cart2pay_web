import { Toaster } from "react-hot-toast";
import Router from "./Navigation/Router";
import { Provider } from "react-redux";
import store from "./redux/state";
import { useEffect } from "react";

function App() {
  //  useEffect(() => {
  //   const script = document.createElement("script");
  //   script.async = true;
  //   script.src = "https://embed.tawk.to/68e2820bf8ba22194ea18fb6/1j6qco01q";
  //   script.charset = "UTF-8";
  //   script.setAttribute("crossorigin", "*");
  //   document.body.appendChild(script);
  // }, []);
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
