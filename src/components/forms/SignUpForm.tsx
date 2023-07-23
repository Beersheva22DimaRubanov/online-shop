import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginData } from '../../model/LoginData';
import { UserData } from '../../model/UserData';
import { useState } from 'react';
import { FormControl, FormHelperText } from '@mui/material';

const defaultTheme = createTheme();
const ERROR_MESSAGE = 'Please fill field'
type Props = {
    submitFn: (loginData: LoginData, userData: UserData) => void
    currentUserData?: UserData 
}
const initialUser: UserData = {email: '', role: '', adress: {city:'', flat:'', house:'',street:''},
   firstName: '', lastName: ''};
export const SignUpForm: React.FC<Props> = ({submitFn, currentUserData}) => {
  const [userData, setUserData] = useState<UserData>(currentUserData|| initialUser)
  const[firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const[lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const[streetErrorMessage, setStreetErrorMessage] = useState('');
  const[cityErrorMessage, setCityErrorMessage] = useState('');
  const[houseErrorMessage, setHouseErrorMessage] = useState('');
  const[emailErrorMessage, setEmailErrorMessage] = useState('');
  const[passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const email =  data.get('email') as string;
      const password = data.get('password') as string;
      if(!userData?.firstName || !userData.lastName || (!userData.email && !currentUserData) || !userData.adress?.city
        || !userData.adress.street || !userData.adress.house || (!password && !currentUserData)){
          if(!userData?.firstName){
            setFirstNameErrorMessage(ERROR_MESSAGE)
          } 
          if(!userData?.lastName){
            setLastNameErrorMessage(ERROR_MESSAGE)
          }
          
          if(!userData?.adress?.city){
            setCityErrorMessage(ERROR_MESSAGE)
          }
          if(!userData?.adress?.street){
            setStreetErrorMessage(ERROR_MESSAGE)
          }
          if(!userData?.adress?.house){
            setHouseErrorMessage(ERROR_MESSAGE)
          }
          if(!currentUserData){
            if(!userData?.email){
            setEmailErrorMessage(ERROR_MESSAGE)
          }
          if(!password){
            setPasswordErrorMessage(ERROR_MESSAGE)
          }}
      }else{
        submitFn({email, password}, userData)
      }
      
  };

  function handleFirstName(event: any){
    setFirstNameErrorMessage('')
    const firstName = event.target.value;
    const userCopy = {...userData!};
    userCopy.firstName = firstName;
   setUserData(userCopy)
}

  function handleLastName(event: any){
    setLastNameErrorMessage('')
    const lastName = event.target.value;
    const userCopy = {...userData!};
    userCopy.lastName = lastName;
   setUserData(userCopy)
}

  function handleCity(event: any){
   setCityErrorMessage('')
    const city = event.target.value;
    const userCopy = {...userData!};
    const adress = {...userCopy.adress};
    adress.city = city;
    userCopy.adress = adress;
   setUserData(userCopy)
}

  function handleStreet(event: any){
   setStreetErrorMessage('')
    const street = event.target.value;
    const userCopy = {...userData!};
    const adress = {...userCopy.adress};
    adress.street = street;
    userCopy.adress = adress;
   setUserData(userCopy)
}

  function handleHouse(event: any){
    setHouseErrorMessage('')
    const house = event.target.value;
    const userCopy = {...userData!};
    const adress = {...userCopy.adress};
    adress.house = house;
    userCopy.adress = adress;
   setUserData(userCopy)
}

  function handleFlat(event: any){
    const flat = event.target.value;
    const userCopy = {...userData!};
    const adress = {...userCopy.adress};
    adress.flat = flat;
    userCopy.adress = adress;
   setUserData(userCopy)
}

  function handleEmail(event: any){
  //   const flat = event.target.value;
  //   const userCopy = {...userData!};
  //   const adress = {...userCopy.adress};
  //   adress.flat = flat;
  //   userCopy.adress = adress;
  //  setUserData(userCopy)
  setEmailErrorMessage('')
}

function handlePassword(event: any){
  setPasswordErrorMessage('')
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {!!currentUserData && <Box>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          </Box>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl required error={!!firstNameErrorMessage}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  value = {userData?.firstName}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleFirstName}
                />
                <FormHelperText>{firstNameErrorMessage}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl required error={!!lastNameErrorMessage}>
                <TextField
                  required
                  fullWidth
                  value = {userData?.lastName}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={handleLastName}
                />
                 <FormHelperText>{lastNameErrorMessage}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl required error={!!cityErrorMessage}>
                <TextField
                  required
                  fullWidth
                  value = {userData?.adress?.city}
                  id="city"
                  label="City"
                  name="city"
                  onChange={handleCity}
                />
                  <FormHelperText>{cityErrorMessage}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl required error={!!streetErrorMessage}>
                <TextField
                  required
                  fullWidth
                  value = {userData?.adress?.street}
                  id="street"
                  label="Street"
                  name="street"
                  onChange={handleStreet}
                />
                  <FormHelperText>{streetErrorMessage}</FormHelperText>
                </FormControl>
                   </Grid>
              <Grid item xs={6} sm={3}>
              <FormControl required error={!!houseErrorMessage}>
                <TextField
                  fullWidth
                  value = {userData?.adress?.house}
                  id="house"
                  label="House"
                  name="house"
                  onChange={handleHouse}
                />
                <FormHelperText>{houseErrorMessage}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  value = {userData?.adress?.flat}
                  id="Flat"
                  label="Flat"
                  name="flat"
                  onChange={handleFlat}
                />
              </Grid>
              {!currentUserData &&  <Box> <Grid item xs={12}>
              <FormControl required error={!!emailErrorMessage}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleEmail}
                />
                 <FormHelperText>{emailErrorMessage}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl required error={!!passwordErrorMessage}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}
                />
                <FormHelperText>{passwordErrorMessage}</FormHelperText>
                </FormControl>
              </Grid>
              </Box>}
    
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             {currentUserData? 'Submit' : 'Sign up'} 
            </Button>
           {!currentUserData && <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
