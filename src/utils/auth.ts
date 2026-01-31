import Cookies from "js-cookie";

export const isAuthenticated = () => {
  return !!Cookies.get("cart2pay_user_token");
};

export const logout = () => {
  Cookies.remove("cart2pay_user_token");
  window.location.replace("/");
};