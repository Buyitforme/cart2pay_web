import { createAsyncThunk } from "@reduxjs/toolkit"
import { userAccountManagementService } from "./userAccountManagementService"

export const triggerGetUserProfile = createAsyncThunk(
  'user_account_management/get_user_profile',
  async (data: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await userAccountManagementService.get_user_profile(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error) 
    }
  }
)