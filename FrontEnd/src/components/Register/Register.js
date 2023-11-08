import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';

import {Grid,Container,CssBaseline,TextField,Button,FormControlLabel,Checkbox,Typography,Paper,Box,} from '@mui/material';
import image from '../../images/Registration_Bg.jpg';

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Check if the password meets the requirements
    const isMinLength = newPassword.length >= 6; // Adjust the minimum length as needed
    setIsPasswordValid(isMinLength);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAdminCheckboxChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isPasswordValid === false) {
      alert('Password does not meet the requirements.');
      return;
    }

    if (password.length === 0 || email.length === 0 || name.length === 0) {
      alert('Please enter all the fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        name,
        email,
        password,
        isAdmin,
      });

      if (response.status === 200) {
        console.log('Registration successful!');
        navigate('/login');
      } else if (response.status === 201) {
        alert('Registration failed. Email already in use.');
      } else {
        console.error('Registration failed:', response.data);
        alert('Your registration request failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div style={{backgroundImage: `url(${image})`,backgroundSize: 'cover',display: 'flex',justifyContent: 'center',alignItems: 'center',minHeight: '100vh',margin: 0,}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
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
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
            />
            {!isPasswordValid && (
              <Typography variant="caption" color="error">
                Password must be at least 6 characters long.
              </Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  value="isAdmin"
                  color="primary"
                  checked={isAdmin}
                  onChange={handleAdminCheckboxChange}
                />
              }
              label="Register as Admin"
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
                } catch (error) {
                  console.error('An error occurred:', error);
                  alert('An error occurred during Google login. Please try again.');
                }
              }}
              onError={(err)=>{console.log(err)}}
              fullWidth variant="contained" color="primary" style={{backgroundColor: 'white', color: 'black', marginLeft: '200px',marginBottom: '10px', maxWidth: '100px'}}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" style={{backgroundColor: 'black', color: 'white', marginLeft: '50px', maxWidth:'250px'}}>
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2" style={{marginLeft:'50px'}}>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default RegistrationPage;
