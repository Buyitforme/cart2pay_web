import { createSlice } from "@reduxjs/toolkit";
import { triggerCreateOrder, triggerOrderDetails, triggerOrderHistory } from "./orderManagementThunk";

interface IinitialState {
  orderHistory: {
    error: boolean;
    loading: boolean;
    data: Record<string, any>;
    message: string;
    statusCode?: number | null;
  };
   orderDetails: {
    error: boolean;
    loading: boolean;
    data: Record<string, any>;
    message: string;
    statusCode?: number | null;
  };
     createOrder: {
    error: boolean;
    loading: boolean;
    data: Record<string, any>;
    message: string;
    statusCode?: number | null;
  };

}
const initialState: IinitialState = {
  orderHistory: {
    error: false,
    loading: false,
    data: {},
    message: "",
    statusCode: null,
  },
    orderDetails: {
    error: false,
    loading: false,
    data: {},
    message: "",
    statusCode: null,
  },
   createOrder: {
    error: false,
    loading: false,
    data: {},
    message: "",
    statusCode: null,
  },
};

const orderManagementSlice = createSlice({
  name: "order_management",
  initialState,
  reducers: {
   
     resetCreateOrderState: (state) => {
      state.createOrder.error = initialState.createOrder.error;
      state.createOrder.message = initialState.createOrder.message;
      state.createOrder.statusCode = initialState.createOrder.statusCode;
    },
  },
  extraReducers: (builder) => {
     // GET USER PROFILE
        builder.addCase(triggerOrderHistory.pending, (state) => {
          state.orderHistory.loading = true;
          state.orderHistory.error = false;
          state.orderHistory.data = {};
          state.orderHistory.message = "";
        });
        builder.addCase(triggerOrderHistory.fulfilled, (state, action) => {
          state.orderHistory.loading = false;
          state.orderHistory.data = action.payload as any;
          state.orderHistory.error = false;
          state.orderHistory.message = action.payload
            ?.message as unknown as string;
          state.orderHistory.statusCode = action.payload
            ?.status_code as unknown as number;
        });
        builder.addCase(triggerOrderHistory.rejected, (state, action) => {
          state.orderHistory.loading = false;
          state.orderHistory.error = true;
          state.orderHistory.data = (action.payload as any) || {};
          state.orderHistory.message =
            (action.payload as any)?.message || "Unknown error";
          state.orderHistory.statusCode =
            (action.payload as any)?.status_code || 400;
        });

          // GET ORDER DETAILS
        builder.addCase(triggerOrderDetails.pending, (state) => {
          state.orderDetails.loading = true;
          state.orderDetails.error = false;
          state.orderDetails.data = {};
          state.orderDetails.message = "";
        });
        builder.addCase(triggerOrderDetails.fulfilled, (state, action) => {
          state.orderDetails.loading = false;
          state.orderDetails.data = action.payload as any;
          state.orderDetails.error = false;
          state.orderDetails.message = action.payload
            ?.message as unknown as string;
          state.orderDetails.statusCode = action.payload
            ?.status_code as unknown as number;
        });
        builder.addCase(triggerOrderDetails.rejected, (state, action) => {
          state.orderDetails.loading = false;
          state.orderDetails.error = true;
          state.orderDetails.data = (action.payload as any) || {};
          state.orderDetails.message =
            (action.payload as any)?.message || "Unknown error";
          state.orderDetails.statusCode =
            (action.payload as any)?.status_code || 400;
        });

              // CREATE ORDER 
        builder.addCase(triggerCreateOrder.pending, (state) => {
          state.createOrder.loading = true;
          state.createOrder.error = false;
          state.createOrder.data = {};
          state.createOrder.message = "";
        });
        builder.addCase(triggerCreateOrder.fulfilled, (state, action) => {
          state.createOrder.loading = false;
          state.createOrder.data = action.payload as any;
          state.createOrder.error = false;
          state.createOrder.message = action.payload
            ?.message as unknown as string;
          state.createOrder.statusCode = action.payload
            ?.status_code as unknown as number;
        });
        builder.addCase(triggerCreateOrder.rejected, (state, action) => {
          state.createOrder.loading = false;
          state.createOrder.error = true;
          state.createOrder.data = (action.payload as any) || {};
          state.createOrder.message =
            (action.payload as any)?.message || "Unknown error";
          state.createOrder.statusCode =
            (action.payload as any)?.status_code || 400;
        });
  },
});
export const {resetCreateOrderState} = orderManagementSlice.actions

export default orderManagementSlice.reducer;
