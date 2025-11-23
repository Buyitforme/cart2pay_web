import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";


const ProtectedRoutes = () => {
  // Get token from cookies
  const token = Cookies.get("cart2pay_user_token");
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
