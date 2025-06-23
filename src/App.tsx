import { Toaster } from "react-hot-toast";
import Router from "./Navigation/Router";

function App() {
  return (
    <div className="bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      <Router />
    </div>
  );
}

export default App;
