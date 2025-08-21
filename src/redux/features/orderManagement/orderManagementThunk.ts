import { createAsyncThunk } from "@reduxjs/toolkit"
import { addressManagementService, orderManagementService } from "./orderManagementService"
import { CreateAddressPayload, CreateOrderPayload, EditAddressPayload } from "./types"



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

export const triggerGeneratePaymentDetails = createAsyncThunk(
  'order_management/generate_payment_details',
  async (orderId: string, thunkAPI) => {
    try {
      const response = await orderManagementService.generate_payment_details(orderId);
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const triggerConfirmPayment = createAsyncThunk(
  'order_management/confirm_payment',
  async (orderId: string, thunkAPI) => {
    try {
      const response = await orderManagementService.confirm_payment(orderId);
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

//Address 
export const triggerGetAddreses = createAsyncThunk(
  'order_management/get_addresses',
  async (data: Record<string, string>, { rejectWithValue }) => {
    try {
      const response =  addressManagementService.get_addresses(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error) 
    }
  }
)

export const TriggerMakeDefaultAddress = createAsyncThunk(
  "order_management/make_default",
  async (addressId: string, { rejectWithValue }) => {
    try {
      const response = await addressManagementService.make_default(true, addressId);
      return response; // Will be handled in extraReducers
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);


export const TriggerCreateAddress = createAsyncThunk(
  "order_management/make_default",
  async (addressId: string, { rejectWithValue }) => {
    try {
      const response = await addressManagementService.make_default(true, addressId);
      return response; 
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const triggerCreateAddress = createAsyncThunk(
  "order_management/create",
  async (payload: CreateAddressPayload, { rejectWithValue }) => {
    try {
      const response = await addressManagementService.create_address(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const triggerEditAddress = createAsyncThunk(
  "address_management/edit_address",
  async (
    { payload, addressId }: { payload: EditAddressPayload; addressId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await addressManagementService.edit_address(
        payload,
        addressId
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const triggerDeleteAddress = createAsyncThunk(
  "address_management/delete_address",
  async (
    {  addressId }: { addressId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await addressManagementService.delete_address(
        addressId
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);