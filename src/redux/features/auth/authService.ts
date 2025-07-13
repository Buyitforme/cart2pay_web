import apiRoutes from "../../../config"
import { post } from "../../network/https"

export class AuthService {
  static async signup(data: Record<string, string>) {
    AuthService._deleteToken()
    const response = await post({
      url: apiRoutes.signup,
      data: { ...data },
    })
    console.log('RESPONSE FROM SERVICE',response)
    if (response.status === 'error') {
      throw new Error(response.message as string)
    }
    if (response.status === 'success') {
      console.log('LOGIN RESPONSE', response)
      AuthService._saveToken(
        response?.results?.access_credentials.access_token
      )
      return response
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem('nssf_user_token', JSON.stringify(data))
  }
  static _deleteToken() {
    localStorage.removeItem('nssf_user_token')
  }
}