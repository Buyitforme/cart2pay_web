import apiRoutes from "../../../config";
import { get} from "../../network/https";


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

}