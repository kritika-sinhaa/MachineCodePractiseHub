import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Link,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log('Form submission started');
        
        const response = await authService.login({
          email: formData.email,
          password: formData.password
        });
        
        console.log('Login successful, response:', response);

        if (response.token) {
          // Store the token
          localStorage.setItem('token', response.token);
          toast.success('Login successful!');
          navigate('/');
        } else {
          throw new Error('No token received from server');
        }

      } catch (error) {
        console.error('Login error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
        
        // Network or connection error
        if (!error.response) {
          const errorMessage = 'Unable to connect to the server. Please check your internet connection.';
          toast.error(errorMessage);
          setErrors({
            submit: errorMessage
          });
          return;
        }

        // Handle specific error cases
        switch (error.response.status) {
          case 401:
            toast.error('Invalid email or password');
            setErrors({
              submit: 'Invalid email or password'
            });
            break;
          case 400:
            const errorMessage = error.response.data?.message || 'Invalid login data';
            toast.error(errorMessage);
            setErrors({
              submit: errorMessage
            });
            break;
          case 404:
            toast.error('User not found');
            setErrors({
              submit: 'User not found'
            });
            break;
          case 500:
            toast.error('Server error. Please try again later.');
            setErrors({
              submit: 'Server error. Please try again later.'
            });
            break;
          default:
            toast.error('Login failed. Please try again later.');
            setErrors({
              submit: 'Login failed. Please try again later.'
            });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    toast.info('Google login coming soon!');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Box>

            {errors.submit && (
              <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                {errors.submit}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ mb: 2 }}
            >
              Continue with Google
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="/register" variant="body2">
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;