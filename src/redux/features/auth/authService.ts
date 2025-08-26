import apiRoutes from "../../../config";
import { post } from "../../network/https";
import Cookies from "js-cookie";


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

   static async otp_service(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.otp_service,
      data: { ...data },
    });
    if (response.status === "error") {
      console.log("OTP RESPONSE FROM SERVICE", response);
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
      throw response;
    }
    if (response.status === "success") {
      AuthService._saveToken(response?.results?.cart2pay_user_token);
      return response;
    }
  }
  // static _saveToken(data: string) {
  //   localStorage.setItem("cart2pay_user_token", JSON.stringify(data));
  // }
   static _saveToken(token: string) {
    Cookies.set("cart2pay_user_token", token, {
      expires: 7, // days
      secure: true, // only HTTPS
      sameSite: "Strict", // prevent CSRF
    });
  }
  //get token
  static _getToken() {
    return Cookies.get("cart2pay_user_token");
  }
  // static _deleteToken() {
  //   localStorage.removeItem("nssf_user_token");
  // }
  //delete token
   static _deleteToken() {
    Cookies.remove("cart2pay_user_token");
  }

   static async forgot_paassword(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.forgot_password,
      data: { ...data },
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
      return response;
    }
  }

     static async reset_paassword(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.reset_password,
      data: { ...data },
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
      return response;
    }
  }

       static async resend_otp(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.resend_otp,
      data: { ...data },
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
      return response;
    }
  }
}
