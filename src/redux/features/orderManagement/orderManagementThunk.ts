import { createAsyncThunk } from "@reduxjs/toolkit"
import { orderManagementService } from "./orderManagementService"



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