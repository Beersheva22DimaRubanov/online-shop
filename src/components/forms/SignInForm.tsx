import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { LoginData } from '../../model/LoginData';
import { Divider } from '@mui/material';
import { NetworkType } from '../../model/NetworkType';

const defaultTheme = createTheme();

type Props = {
  submitFn: (loginData: LoginData) => void
  networks?: NetworkType[]
}

const SignInForm: React.FC<Props> = ({ submitFn, networks }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    submitFn({ email, password })
  };

  return <ThemeProvider theme={defaultTheme}>
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {networks && networks.length > 0 && <Grid item xs={6}  sm={6} md={6}>
                                <Divider sx={{ width: "100%", fontWeight: "bold" }}>or</Divider>
                            {networks.map(n =>  <Button key={n.providerName}
                                onClick={() =>
                                    submitFn({ email: n.providerName, password: '' })} fullWidth variant="outlined"
                                sx={{ mt: 2 }}
                            >
                                <Avatar src={n.providerIconUrl} sx={{ width: { xs: '6vh', sm: '6vw', lg: '3vw' } }} />
                            </Button>)}
                            </Grid>}
          <Grid container>
            <Grid item>
              <Link to={'/signUp'}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
}

export default SignInForm;