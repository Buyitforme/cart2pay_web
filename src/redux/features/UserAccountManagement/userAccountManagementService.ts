import apiRoutes from "../../../config";
import { get, put} from "../../network/https";
import { EditUserProfilePayload, EditUserProfileResponse } from "./types";



export class userAccountManagementService {
  static async get_user_profile(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.get_user_profile,
      data: { ...data },
    });
    if (response.status === "error") {
      throw response;
    }
    if (response.status === "success") {
        console.log('USER PROFILE',JSON.stringify(response,null,2))
      return response;
    }
  }

static async edit_user_profile(data: EditUserProfilePayload) {
    const response = await put({
      url: apiRoutes.get_user_profile,
      data,
    });

    if (response.status === "error") {
      throw response;
    }

    if (response.status === "success") {
      console.log("USER PROFILE", JSON.stringify(response, null, 2));
      return response;
    }
    throw new Error("Unexpected response structure");
  }

}

