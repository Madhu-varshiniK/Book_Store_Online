import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, CssBaseline, TextField, Button, FormControlLabel, Checkbox, Grid, Typography, Paper, Box } from '@mui/material';
import { useUser } from '../../UserContext';
import image from '../../images/Login_Bg.jpg'
import Cookies from 'js-cookie';

import { GoogleLogin } from '@react-oauth/google';



function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const { login } = useUser();
  
    useEffect(() => {
      // Check if the user is already logged in
      if (Cookies.get('isLoggedIn')) {
             navigate('/');
      }
    }, [navigate]);
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      // Basic form validation
      if (!email || !password) {
        alert('Please fill in both email and password fields.');
        return;
      }
  
      // Add authentication logic here (e.g., check credentials)
      try {
        const response = await axios.post('http://localhost:5000/users/login', { email, password, isAdmin });
  
        // Check the response status or data for success or errors
        if (response.status === 200) {
          // Registration successful, handle accordingly (e.g., redirect)
          console.log('Login successful!');
         

          if (isAdmin) {
            console.log('Admin is logged IN');
            navigate('/books');
          } else {
            navigate('/');
          }
          login(true, isAdmin, email);
        } else {
          // Registration failed, handle accordingly (e.g., display error messages)
          console.error('Login failed:', response.data);
          alert('Your login credentials are incorrect.');
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('An error occurred:', error);
      }
    };
  
    return (
      <div style={{ backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0,}}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              Login Page
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />}
                label="Login as Admin"
              />
              <GoogleLogin
              onSuccess={async credentialResponse=>{
                try {
                  const response = await axios.post('http://localhost:5000/users/google', {
                    tokenId: credentialResponse.credential,
                  });
              
                  console.log(response);
              
                  if (response.status === 200) {
                    console.log('Login successful!');
                    navigate('/');
                  } else if (response.status === 400) {
                    alert('Something went wrong...');
                  } else {
                    console.error('Registration failed:', response.data);
                    alert('Your registration request failed. Please try again.');
                  }
                  login(true, isAdmin, email);
                } catch (error) {
                  console.error('An error occurred:', error);
                  alert('An error occurred during Google login. Please try again.');
                }
              }}
              onError={(err)=>console.log(err)}
              fullWidth variant="contained" color="primary" style={{backgroundColor: 'white', color: 'black', marginLeft: '200px',marginBottom: '10px', maxWidth: '100px'}}
            />
              <Button type="submit" fullWidth variant="contained" color="primary" style={{backgroundColor: 'black', color: 'white', marginLeft: '50px', maxWidth: '250px'}}>
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register" variant="body2" style={{marginLeft:'50px'}}>
                    Don't have an account? Register
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
        </div>
    );
  }
  
  export default LoginPage;
  