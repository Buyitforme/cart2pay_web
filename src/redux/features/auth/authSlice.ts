import { createSlice } from "@reduxjs/toolkit";
import { triggerSignin, triggerSignup } from "./authThunk";

interface IinitialState {
  error: boolean;
  loading: boolean;
  data: Record<string, any>;
  message: string;
  statusCode?: number | null;
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  data: {},
  message: "",
  statusCode: null,
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
  },
});

export const {resetState} = userSlice.actions

export default userSlice.reducer;
