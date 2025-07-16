import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const token = localStorage.getItem('cart2pay_user_token');
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
