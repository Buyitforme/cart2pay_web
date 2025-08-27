import apiRoutes from "../../../config";
import { get, post, put, del } from "../../network/https";
import { CreateAddressPayload, CreateOrderPayload, EditAddressPayload } from "./types";

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
      return response;
    }
  }

  static async order_details(orderId: string) {
    const response = await get({
      url: `${apiRoutes.order_details}/${orderId}`,
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
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
      return response;
    }
  }

  static async generate_payment_details(orderId: string) {
    const response = await get({
      url: `${apiRoutes.payment_details}/${orderId}`,
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
      return response;
    }
  }

   static async confirm_payment(orderId: string) {
    const response = await get({
      url: `${apiRoutes.confirm_payment}/${orderId}`,
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
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
      return response;
    }
  }
  static async make_default(data: boolean, addressId: string) {
    const response = await put({
      url: `${apiRoutes.get_addresses}/${addressId}/make-default`,
      data: { isDefault: data },
    });

    if (response.status === "error") {
      throw response;
    }

    if (response.status === "success") {
      return response;
    }
  }

  static async create_address(data: CreateAddressPayload) {
    const response = await post({
      url: apiRoutes.create_address,
      data,
    });

    if (response.status === "error") {
      throw response;
    }

    if (response.status === "success") {
      return response;
    }
  }
   static async edit_address(data: EditAddressPayload, addressId: string) {
    const response = await put({
      url: `${apiRoutes.get_addresses}/${addressId}`,
      data,
    });

    if (response.status === "error") {
      throw response;
    }

    if (response.status === "success") {

      return response;
    }
  }
   static async delete_address( addressId: string) {
    const response = await del({
      url: `${apiRoutes.deleteAddress}${addressId}`,
    });

    if (response.status === "error") {
      throw response;
    }

    if (response.status === "success") {

      return response;
    }
  }
}
