import { createAsyncThunk } from "@reduxjs/toolkit"
import { orderManagementService } from "./orderManagementService"
import { CreateOrderPayload } from "./types"



export const triggerOrderHistory = createAsyncThunk(
  'order_management/order_history',
  async (data: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await orderManagementService.order_history(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error) 
    }
  }
)

export const triggerOrderDetails = createAsyncThunk(
  'order_management/order_details',
  async (orderId: string, thunkAPI) => {
    try {
      const response = await orderManagementService.order_details(orderId);
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const triggerCreateOrder = createAsyncThunk<
  any,
  CreateOrderPayload,
  {
    rejectValue: {
      message: string;
      details?: any;
    };
  }
>("order/create", async (payload, { rejectWithValue }) => {
  try {
    const response = await orderManagementService.create_order(payload);
    return response;
  } catch (error: any) {
    const message = error?.message || "Something went wrong creating the order";
    const details = error?.data || null;

    return rejectWithValue({
      message,
      details,
    });
  }
});