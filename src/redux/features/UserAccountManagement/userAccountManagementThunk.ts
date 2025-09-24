import { createAsyncThunk } from "@reduxjs/toolkit"
import { userAccountManagementService } from "./userAccountManagementService"
import { EditUserProfilePayload } from "./types"

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

export const triggerEditUserProfile = createAsyncThunk(
  "user_account_management/edit_user_profile",
  async (data: EditUserProfilePayload, { rejectWithValue }) => {
    try {
      const response = await userAccountManagementService.edit_user_profile(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);