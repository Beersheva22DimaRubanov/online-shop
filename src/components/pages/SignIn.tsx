import { Typography } from "@mui/material"
import SignInForm from "../forms/SignInForm";
import { LoginData } from "../../model/LoginData";
import { authService } from "../../config/service-config";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/AuthSlice";

const SignInPage: React.FC = () => {
    const dispatch = useDispatch()
   async function submitFn(loginData: LoginData){
     const user =  await authService.login(loginData);
    user && dispatch(authActions.setUser(user))
    }
    return <SignInForm submitFn={submitFn} networks={authService.getAvailableProvider()}></SignInForm>
}

export default SignInPage;