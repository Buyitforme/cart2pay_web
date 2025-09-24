export interface EditUserProfileResponse {
  status: "success" | "error";
  message: string;
  results?: {
    data: {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      // add more fields if your backend returns them
    };
    statusCode : number
  };
}

export interface EditUserProfilePayload {
  fullName: string;
  email: string;
  phone: string;
}