interface ApiUrls {
  signup: string,
  login:string,
  otp_service:string,
  
}

const apiRoutes: ApiUrls = {
  signup: '/api/auth/signup',
  login:'/api/auth/login',
  otp_service:'/api/auth/verify-email',

}

export default apiRoutes
