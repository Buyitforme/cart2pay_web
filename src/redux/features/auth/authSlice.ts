import { createSlice } from "@reduxjs/toolkit";
import { triggerForgotPassword, triggerOtpService, triggerResendOtp, triggerResetPassword, triggerSignin, triggerSignup } from "./authThunk";

interface IinitialState {
  error: boolean;
  loading: boolean;
  data: Record<string, any>;
  message: string;
  statusCode?: number | null;

  resendOtpData :{
     error: boolean;
  loading: boolean;
  data: Record<string, any>;
  message: string;
  statusCode?: number | null;
  }
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  data: {},
  message: "",
  statusCode: null,
  
  resendOtpData :{
      error: false,
  loading: false,
  data: {},
  message: "",
  statusCode: null,
  }
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.statusCode = initialState.statusCode;
    },
      resetResendOtpState: (state) => {
      state.resendOtpData.error = initialState.resendOtpData.error;
      state.resendOtpData.message = initialState.resendOtpData.message;
      state.resendOtpData.statusCode = initialState.resendOtpData.statusCode;
    },
  
  },
  extraReducers: (builder) => {
    // SIGN UP
    builder.addCase(triggerSignup.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.data = {};
      state.message = "";
    });
    builder.addCase(triggerSignup.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload as any;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      state.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerSignup.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.data = (action.payload as any) || {};
      state.message = (action.payload as any)?.message || "Unknown error";
      state.statusCode = (action.payload as any)?.status_code || 400;
    });

    // SIGN IN
    builder.addCase(triggerSignin.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.data = {};
      state.message = "";
    });
    builder.addCase(triggerSignin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload as any;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      state.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerSignin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.data = (action.payload as any) || {};
      state.message = (action.payload as any)?.message || "Unknown error";
      state.statusCode = (action.payload as any)?.status_code || 400;
    });
        // Otp Service
    builder.addCase(triggerOtpService.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.data = {};
      state.message = "";
    });
    builder.addCase(triggerOtpService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload as any;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      state.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerOtpService.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.data = (action.payload as any) || {};
      state.message = (action.payload as any)?.message || "Unknown error";
      state.statusCode = (action.payload as any)?.status_code || 400;
    });

         // FORGOT PASSWORD
    builder.addCase(triggerForgotPassword.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.data = {};
      state.message = "";
    });
    builder.addCase(triggerForgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload as any;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      state.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerForgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.data = (action.payload as any) || {};
      state.message = (action.payload as any)?.message || "Unknown error";
      state.statusCode = (action.payload as any)?.status_code || 400;
    });

         // RESET PASSWORD
    builder.addCase(triggerResetPassword.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.data = {};
      state.message = "";
    });
    builder.addCase(triggerResetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload as any;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      state.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerResetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.data = (action.payload as any) || {};
      state.message = (action.payload as any)?.message || "Unknown error";
      state.statusCode = (action.payload as any)?.status_code || 400;
    });

           // RESEND OTP
    builder.addCase(triggerResendOtp.pending, (state) => {
      state.resendOtpData.loading = true;
      state.resendOtpData.error = false;
      state.resendOtpData.data = {};
      state.resendOtpData.message = "";
    });
    builder.addCase(triggerResendOtp.fulfilled, (state, action) => {
      state.resendOtpData.loading = false;
      state.resendOtpData.data = action.payload as any;
      state.resendOtpData.error = false;
      state.resendOtpData.message = action.payload?.message as unknown as string;
      state.resendOtpData.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerResendOtp.rejected, (state, action) => {
      state.resendOtpData.loading = false;
      state.resendOtpData.error = true;
      state.resendOtpData.data = (action.payload as any) || {};
      state.resendOtpData.message = (action.payload as any)?.message || "Unknown error";
      state.resendOtpData.statusCode = (action.payload as any)?.status_code || 400;
    });
  },
});

export const {resetState,resetResendOtpState} = userSlice.actions

export default userSlice.reducer;
