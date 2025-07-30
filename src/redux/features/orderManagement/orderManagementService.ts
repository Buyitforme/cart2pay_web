import apiRoutes from "../../../config";
import {get} from "../../network/https";



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

}

