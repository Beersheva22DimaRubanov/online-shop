import { Button, Container, Typography } from "@mui/material";
import { useSelectorAuth } from "../../redux/store"
import { useState } from "react";
import { SignUpForm } from "../forms/SignUpForm";
import { LoginData } from "../../model/LoginData";
import { UserData } from "../../model/UserData";
import { authService } from "../../config/service-config";
import { UID } from "../../service/authService/AuthServiceFire";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/AuthSlice";

const style = {
  my: 2,
  
}

const UserProfile: React.FC = () => {
  const userData = useSelectorAuth();
  const[open, setOpen] = useState(false);
  const dispatch = useDispatch();

 async function submitFn(loginData: LoginData, userData: UserData){
    const uid = localStorage.getItem(UID);
    if(uid){
     await authService.updateUser(userData, uid);
      dispatch(authActions.setUser(userData))
    }
    setOpen(false)
  }

  return <Container>
      <Typography variant="h3" sx={{mb: 10}}>My information</Typography>
      <Typography variant="h6" sx={style}>FirstName: {userData?.firstName}</Typography>
      <Typography variant="h6" sx={style}>LastName: {userData?.lastName}</Typography>
      <Typography variant="h6" sx={style}>email: {userData?.email}</Typography>
      <Typography variant="h6" sx={style}>City: {userData?.adress?.city}</Typography>
      <Typography variant="h6" sx={style}>Street: {userData?.adress?.street}</Typography>
      <Typography variant="h6" sx={style}>House: {userData?.adress?.house}</Typography>
      <Typography variant="h6" sx={style}>Flat: {userData?.adress?.flat}</Typography>
      <Button onClick={() => setOpen(true)}>Change</Button>
      {open && <SignUpForm submitFn={submitFn} currentUserData={userData}></SignUpForm>}
  </Container>
}

export default UserProfile;