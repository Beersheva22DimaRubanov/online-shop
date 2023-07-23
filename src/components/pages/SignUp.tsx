import { Typography } from "@mui/material"
import { SignUpForm } from "../forms/SignUpForm"
import { LoginData } from "../../model/LoginData";
import { authService } from "../../config/service-config";
import { UserData } from "../../model/UserData";

const SignUpPage: React.FC = () => {
    async function submitFn(loginData: LoginData, userData: UserData){
        await authService.signUp(loginData, userData);
    }

    return <SignUpForm submitFn={submitFn}></SignUpForm>
}

export default SignUpPage;