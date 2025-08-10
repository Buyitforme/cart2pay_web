import apiRoutes from "../../../config";
import {get, post, put} from "../../network/https";
import { CreateOrderPayload } from "./types";

type SafePayload = Omit<CreateOrderPayload, "details"> & {
  details: string;
};


export class orderManagementService {
  static async order_history(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.order_history,
      data: { ...data },
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
        console.log('ORDERS',JSON.stringify(response,null,2))
      return response;
    }
  }

 static async order_details(orderId :string) {
    const response = await get({
       url: `${apiRoutes.order_details}/${orderId}`,
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
        console.log('ORDER DETAILS',JSON.stringify(response,null,2))
      return response;
    }
  }

  static async create_order(data: CreateOrderPayload) {
    const formattedPayload: SafePayload = {
      ...data,
      details: JSON.stringify(data.details),
    };

    const response = await post({
      url: apiRoutes.create_order,
      data: formattedPayload,
    });

    if (response.status === "error") {
      throw response;
    }

    if (response.status === "success") {
      console.log("ORDER CREATED", JSON.stringify(response, null, 2));
      return response;
    }
  }

}

export class addressManagementService {
  static async get_addresses(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.get_addresses,
      data: { ...data },
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
        console.log('ORDERS',JSON.stringify(response,null,2))
      return response;
    }
  }
static async make_default(data:boolean, addressId: string) {
  const response = await put({
    url: `${apiRoutes.get_addresses}/${addressId}/make-default`,
        data: { isDefault: data }, 

  });

  if (response.status === "error") {
    throw response;
  }
  
  if (response.status === "success") {
    console.log('ORDERS', JSON.stringify(response, null, 2));
    return response;
  }
}


}