import { AuthService } from "./authService"
import { createAsyncThunk } from '@reduxjs/toolkit'


export const triggerSignup = createAsyncThunk(
  'auth/signup',
  async (data: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await AuthService.signup(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error) 
    }
  }
)

export const triggerSignin = createAsyncThunk(
  'auth/signin',
  async (data: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await AuthService.signin(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error) 
    }
  }
)

export const triggerOtpService = createAsyncThunk(
  'auth/otp_service',
  async (data: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await AuthService.otp_service(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error) 
    }
  }
)

export const triggerForgotPassword = createAsyncThunk(
  'auth/forgot_paassword',
  async (data: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await AuthService.forgot_paassword(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error) 
    }
  }
)

export const triggerResetPassword = createAsyncThunk(
  'auth/reset_paassword',
  async (data: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await AuthService.reset_paassword(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error) 
    }
  }
)

export const triggerResendOtp = createAsyncThunk(
  'auth/resend_otp',
  async (data: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await AuthService.resend_otp(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error) 
    }
  }
)