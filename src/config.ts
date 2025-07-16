interface ApiUrls {
  signup: string;
  login: string;
  otp_service: string;
  forgot_password: string;
  reset_password: string;
  resend_otp: string;
}

const apiRoutes: ApiUrls = {
  signup: "/api/auth/signup",
  login: "/api/auth/login",
  otp_service: "/api/auth/verify-email",
  forgot_password: "/api/auth/forgot-password",
  reset_password: "/api/auth/reset-password",
  resend_otp: "/api/auth/resend-otp",
};

export default apiRoutes;
