import { createSlice } from "@reduxjs/toolkit";
import { triggerCreateAddress, triggerCreateOrder, triggerGetAddreses, TriggerMakeDefaultAddress, triggerOrderDetails, triggerOrderHistory } from "./orderManagementThunk";

interface IinitialState {
   error: boolean;
    loading: boolean;
    data: Record<string, any>;
    message: string;
    statusCode?: number | null;

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
   addresses: {
    error: boolean;
    loading: boolean;
    data: Record<string, any>;
    message: string;
    statusCode?: number | null;
  };
 makeDefault: {
    error: boolean;
    loading: boolean;
    data: Record<string, any>;
    message: string;
    statusCode?: number | null;
  };
}
const initialState: IinitialState = {
   error: false,
    loading: false,
    data: {},
    message: "",
    statusCode: null,

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
   addresses: {
    error: false,
    loading: false,
    data: {},
    message: "",
    statusCode: null,
  },
    makeDefault: {
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
   
     resetState: (state) => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.statusCode = initialState.statusCode;
    },
      resetCreateOrderState: (state) => {
      state.createOrder.error = initialState.createOrder.error;
      state.createOrder.message = initialState.createOrder.message;
      state.createOrder.statusCode = initialState.createOrder.statusCode;
    },
      resetMakeDefaultState: (state) => {
      state.makeDefault.error = initialState.makeDefault.error;
      state.makeDefault.message = initialState.makeDefault.message;
      state.makeDefault.statusCode = initialState.makeDefault.statusCode;
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
          // ADDRESES 
        builder.addCase(triggerGetAddreses.pending, (state) => {
          state.addresses.loading = true;
          state.addresses.error = false;
          state.addresses.data = {};
          state.addresses.message = "";
        });
        builder.addCase(triggerGetAddreses.fulfilled, (state, action) => {
          state.addresses.loading = false;
          state.addresses.data = action.payload as any;
          state.addresses.error = false;
          state.addresses.message = action.payload
            ?.message as unknown as string;
          state.addresses.statusCode = action.payload
            ?.status_code as unknown as number;
        });
        builder.addCase(triggerGetAddreses.rejected, (state, action) => {
          state.addresses.loading = false;
          state.addresses.error = true;
          state.addresses.data = (action.payload as any) || {};
          state.addresses.message =
            (action.payload as any)?.message || "Unknown error";
          state.addresses.statusCode =
            (action.payload as any)?.status_code || 400;
        });
          // MAKE DEFAULT ADDRESES 
        builder.addCase(TriggerMakeDefaultAddress.pending, (state) => {
          state.makeDefault.loading = true;
          state.makeDefault.error = false;
          state.makeDefault.data = {};
          state.makeDefault.message = "";
        });
        builder.addCase(TriggerMakeDefaultAddress.fulfilled, (state, action) => {
          state.makeDefault.loading = false;
          state.makeDefault.data = action.payload as any;
          state.makeDefault.error = false;
          state.makeDefault.message = action.payload
            ?.message as unknown as string;
          state.makeDefault.statusCode = action.payload
            ?.status_code as unknown as number;
        });
        builder.addCase(TriggerMakeDefaultAddress.rejected, (state, action) => {
          state.makeDefault.loading = false;
          state.makeDefault.error = true;
          state.makeDefault.data = (action.payload as any) || {};
          state.makeDefault.message =
            (action.payload as any)?.message || "Unknown error";
          state.makeDefault.statusCode =
            (action.payload as any)?.status_code || 400;
        });
            // MAKE DEFAULT ADDRESES 
        builder.addCase(triggerCreateAddress.pending, (state) => {
          state.loading = true;
          state.error = false;
          state.data = {};
          state.message = "";
        });
        builder.addCase(triggerCreateAddress.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload as any;
          state.error = false;
          state.message = action.payload
            ?.message as unknown as string;
          state.statusCode = action.payload
            ?.status_code as unknown as number;
        });
        builder.addCase(triggerCreateAddress.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.data = (action.payload as any) || {};
          state.message =
            (action.payload as any)?.message || "Unknown error";
          state.statusCode =
            (action.payload as any)?.status_code || 400;
        });

  },
});
export const {resetCreateOrderState,resetState,resetMakeDefaultState} = orderManagementSlice.actions

export default orderManagementSlice.reducer;
