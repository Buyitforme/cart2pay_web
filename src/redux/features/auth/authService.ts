import apiRoutes from "../../../config";
import { post } from "../../network/https";

export class AuthService {
  static async signup(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.signup,
      data: { ...data },
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
      return response;
    }
  }

  static async signin(data: Record<string, string>) {
    AuthService._deleteToken();
    const response = await post({
      url: apiRoutes.login,
      data: { ...data },
    });
    if (response.status === "error") {
      console.log("LOGIN RESPONSE FROM SERVICE", response);
      throw response;
    }
    if (response.status === "success") {
      console.log("token", response?.results?.cart2pay_user_token);
      AuthService._saveToken(response?.results?.cart2pay_user_token);
      return response;
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem("cart2pay_user_token", JSON.stringify(data));
  }
  static _deleteToken() {
    localStorage.removeItem("nssf_user_token");
  }
}
