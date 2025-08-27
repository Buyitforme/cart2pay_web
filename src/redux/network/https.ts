import axios from 'axios'
import Cookies from "js-cookie";


interface IAjax {
  method: string
  url: string
  data: Record<string, any>
  baseURL: string
  headers?: Record<string, string>
  before: () => void
  after: () => void
  mutate: boolean
  success: () => void
  error: () => void
  handleError: boolean
  serverError: boolean
  formErrors: boolean
  axiosProps: Record<string, string>
}

const URL = process.env.REACT_APP_BACKEND_URL

// Axios instance
export const axiosInstance = axios.create({
  baseURL: URL,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor callbacks
// Request Success
const requestInterceptorSuccessCB = async (successfulReq: any) => {
  if (successfulReq.method === 'post' || successfulReq.method === 'POST') {
    const JSONData = JSON.stringify(successfulReq.data)
    successfulReq.data = JSONData
  }
  // const authToken = JSON.parse(
  //   localStorage.getItem('cart2pay_user_token') as string
  // )
  //get token
    const authToken = Cookies.get("cart2pay_user_token");


  if (authToken) {
    successfulReq.headers.Authorization = `Bearer ${authToken as string}`
  }
  return successfulReq
}

// Request Error
const requestInterceptorErrorCB = async (error: any) => {
  if (error.config.method === 'post' || error.config.method === 'POST') {
    error.response = {
      ...error.response,
      data: JSON.parse(error.response.data),
    }
  }
  return await Promise.reject(error)
}

// Response interceptor callbacks
const responseInterceptorSuccessCB = (successRes: any) => {
  // const store = getStore();
  // dispatchAction(loginUser());
  if (
    successRes.config.method === 'post' ||
    successRes.config.method === 'POST'
  ) {
    //
  }
  return successRes
}

// Response Error
// const responseInterceptorErrorCB = async (error: any) => {
//   const originalRequest = error.config
//   if (
//     error.response?.status === 401 &&
//     error.response.data.message ===
//       'Authentication failed, invalid credentials.' &&
//     !originalRequest._retry
//   ) {
//     originalRequest._retry = true
   
//   } else if (
//     error.response?.status === 401 
   
//   ) {
//     localStorage.removeItem('cart2pay_user_token')
//     // window.location.replace('/')
//   }

//   return await Promise.reject(error.response.data)
// }
const responseInterceptorErrorCB = async (error: any) => {
  if (error.response?.status === 401) {
    window.location.replace('/');
  }
  return await Promise.reject(error.response.data);
};

;(() => {
  axiosInstance.interceptors.request.use(
    requestInterceptorSuccessCB,
    requestInterceptorErrorCB
  )

  axiosInstance.interceptors.response.use(
    responseInterceptorSuccessCB,
    responseInterceptorErrorCB
  )
})()

// Handle Response Data
const handleHttpResponse = (
  response: Record<string, any>,
  success: (arg: Record<string, any>) => void
) => {
  // No Data Was Returned
  if (!response.data) {
    return
  }
  //altered
  if (!response.data) {
    success(response)
  }
}

// Handle Response Errors
interface HttpError {
  response: Record<string, any>
  error: ({ status }: any) => void
  formErrors: boolean
}
function handleHttpError({ response, error, formErrors }: HttpError) {
  // No Response Was Returned
  if (!response) {
    error({ status: 449 })
    return
  }

  error(response)

  // Handle Error States / Codes
  switch (response.status) {
    case 400:
      // Bad Request
      break
    case 404:
      // Not Found
      break
    case 419:
      // X-CSRF-TOKEN Error
      break
    case 422:
      if (formErrors) {
        // Input Data Error
      }
      break
    case 500:
      // Server Error
      break
    case 504:
      // Gateway Timeout
      break
    case 449:
      // Just Try Again
      break
    default:
      // Unknown Error
      break
  }
}

// Send HTTP Request
async function ajax({
  method = 'GET',
  url,
  data,
  baseURL,
  headers = {},
  before = () => {},
  success = () => {},
  error = () => {},
  handleError = true,
  serverError = false,
  formErrors = true,
  axiosProps = {},
}: IAjax) {
  // Request Response And Error
  interface Result {
    status_code: number | null
    status: string
    message: string
    results?: Record<string, any>
    timeStamp?: string
  }

  let result: Result = {
    status_code: null,
    status: '',
    message: '',
    results: {},
    timeStamp: '',
  }
  // Call Before Function
  before()

  // Send Request
  await axiosInstance({
    // Request URL
    url,
    // Request Method
    method,
    // To overwrite incase
    baseURL,
    // Post Data
    data,
    // Request Headers
    headers,
    // Axios Specific Properties
    ...axiosProps,
  })
    .then(response => {
      // Assign Request Response
      result.status_code = response.data.statusCode
      result.results = response.data.data || response.data.results
      result.message = response.data.message
      result.status = response.data.status
      // result.timeStamp = response.data.timestamp
      // Handle Responses
      handleHttpResponse(response, success)
    })
    .catch(err => {
      result.status_code = err.statusCode
      result.results = err.results || err.data || {}
      result.message = err.message
      result.status = err.status
      if (handleError) {
        handleHttpError({
          ...err,
          error,
          serverError,
          formErrors,
        })
      }
    })
  return result
}

export const get = async (payload: any) =>
  await ajax({ ...payload, method: 'GET' })

export const post = async (payload: any) =>
  await ajax({ ...payload, method: 'POST' })

export const del = async (payload: any) =>
  await ajax({ ...payload, method: 'DELETE' })

export const put = async (payload: any) =>
  await ajax({ ...payload, method: 'PUT' })

export const patch = async (payload: any) =>
  await ajax({ ...payload, method: 'PATCH' })
