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
