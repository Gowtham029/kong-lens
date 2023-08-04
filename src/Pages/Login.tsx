/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/joy/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { Alert, Input, Stack } from '@mui/joy';
import { useDispatch, useSelector, connect } from 'react-redux';
import logo from '../assets/kong-lens.png';
import { loginUser } from '../Actions/loginActions';

const theme = createTheme();

function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { showLoginErrorMessage } = useSelector(
    (state: any) => state.loginReducer
  );
  const { setPreserveRoute } = useSelector((state: any) => state.loginReducer);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = { identity: userName, password };
    dispatch(loginUser(data, navigate, setPreserveRoute));
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img style={{ height: 200, width: 200 }} src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <Stack spacing={0.5} sx={{ width: 300 }}>
            <Input
              required
              name="email"
              id="email"
              placeholder="Email Address"
              autoComplete="email"
              autoFocus
              value={userName}
              fullWidth
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              required
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2, background: '#2a3f54', color: 'white' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            {showLoginErrorMessage.show && (
              <Alert variant="soft" color="danger">
                {showLoginErrorMessage.message}
              </Alert>
            )}
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default connect(null, { loginUser })(Login);
