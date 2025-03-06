import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { authService } from '../../services/authService';
import '../styles/Register.css';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log('Submitting registration form with data:', {
          ...formData,
          password: '[REDACTED]'
        });

        const response = await authService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        
        console.log('Registration successful:', response);
        
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        toast.success('Registration successful! You can now login with your credentials.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);

      } catch (error) {
        console.error('Registration error:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
        
        // Network or connection error
        if (!error.response) {
          toast.error('Unable to connect to the server. Please check your internet connection.');
          setErrors({
            submit: 'Connection error. Please try again.'
          });
          return;
        }

        // Server returned an error response
        if (error.response?.status === 409) {
          toast.error('Username or email already exists');
          setErrors({
            submit: 'Username or email already exists'
          });
        } else if (error.response?.status === 400) {
          toast.error('Please check your input and try again');
          const validationErrors = {};
          if (error.response?.data?.errors) {
            Object.entries(error.response.data.errors).forEach(([field, message]) => {
              validationErrors[field] = message;
            });
            setErrors(validationErrors);
          } else {
            setErrors({
              submit: error.response?.data?.message || 'Invalid registration data'
            });
          }
        } else {
          const errorMessage = error.response?.data?.message || 'Registration failed. Please try again later.';
          toast.error(errorMessage);
          setErrors({
            submit: errorMessage
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="register-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="register-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <button 
            type="submit" 
            className="register-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;