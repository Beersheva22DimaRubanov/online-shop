import { LoginData } from "../../model/LoginData"
import { UserData } from "../../model/UserData"

export default interface Auth{
    login(loginData: LoginData) : Promise<UserData>
    signUp(loginData: LoginData, userData: UserData): void
    logout():Promise<void>
    getAvailableProvider(): {providerName: string, providerIconUrl: string}[]
    updateUser(userData: UserData, uid: string): Promise<UserData>
}