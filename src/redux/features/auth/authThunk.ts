import { AuthService } from "./authService"
import { createAsyncThunk } from '@reduxjs/toolkit'


export const triggerSignup = createAsyncThunk(
  'auth/signin',
  async (params: Record<string, string>, thunkAPI) => {
    try {
      return await AuthService.signup(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)