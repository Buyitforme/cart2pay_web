import { createSlice } from "@reduxjs/toolkit";
import { triggerEditUserProfile, triggerGetUserProfile } from "./userAccountManagementThunk";

interface IinitialState {
  getUserProfileData: {
    error: boolean;
    loading: boolean;
    data: Record<string, any>;
    message: string;
    statusCode?: number | null;
  };
  editUserProfileData: {
    error: boolean;
    loading: boolean;
    data: Record<string, any>;
    message: string;
    statusCode?: number | null;
  };
}

const initialState: IinitialState = {
  getUserProfileData: {
    error: false,
    loading: false,
    data: {},
    message: "",
    statusCode: null,
  },
  editUserProfileData: {
    error: false,
    loading: false,
    data: {},
    message: "",
    statusCode: null,
  },
};

const userAccountManagementSlice = createSlice({
  name: "user_account_management",
  initialState,
  reducers: {
    resetUserProfileState: (state) => {
      state.getUserProfileData.error = initialState.getUserProfileData.error;
      state.getUserProfileData.message =
        initialState.getUserProfileData.message;
      state.getUserProfileData.statusCode =
        initialState.getUserProfileData.statusCode;
    },
  },
  extraReducers: (builder) => {
    // GET USER PROFILE
    builder.addCase(triggerGetUserProfile.pending, (state) => {
      state.getUserProfileData.loading = true;
      state.getUserProfileData.error = false;
      state.getUserProfileData.data = {};
      state.getUserProfileData.message = "";
    });
    builder.addCase(triggerGetUserProfile.fulfilled, (state, action) => {
      state.getUserProfileData.loading = false;
      state.getUserProfileData.data = action.payload as any;
      state.getUserProfileData.error = false;
      state.getUserProfileData.message = action.payload
        ?.message as unknown as string;
      state.getUserProfileData.statusCode = action.payload
        ?.status_code as unknown as number;
    });
    builder.addCase(triggerGetUserProfile.rejected, (state, action) => {
      state.getUserProfileData.loading = false;
      state.getUserProfileData.error = true;
      state.getUserProfileData.data = (action.payload as any) || {};
      state.getUserProfileData.message =
        (action.payload as any)?.message || "Unknown error";
      state.getUserProfileData.statusCode =
        (action.payload as any)?.status_code || 400;
    });

      // EDIT USER PROFILE
    builder.addCase(triggerEditUserProfile.pending, (state) => {
      state.editUserProfileData.loading = true;
      state.editUserProfileData.error = false;
      state.editUserProfileData.data = {};
      state.editUserProfileData.message = "";
    });
    builder.addCase(triggerEditUserProfile.fulfilled, (state, action) => {
      state.editUserProfileData.loading = false;
      state.editUserProfileData.data = action.payload as any;
      state.editUserProfileData.error = false;
      state.editUserProfileData.message = action.payload
        ?.message as unknown as string;
      state.editUserProfileData.statusCode = action.payload.status_code as unknown as number;
    });
    builder.addCase(triggerEditUserProfile.rejected, (state, action) => {
      state.editUserProfileData.loading = false;
      state.editUserProfileData.error = true;
      state.editUserProfileData.data = (action.payload as any) || {};
      state.editUserProfileData.message =
        (action.payload as any)?.message || "Unknown error";
      state.editUserProfileData.statusCode =
        (action.payload as any)?.status_code || 400;
    });
  },
});

export const { resetUserProfileState } = userAccountManagementSlice.actions;

export default userAccountManagementSlice.reducer;
