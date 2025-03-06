import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import './Register.css';

const Register = () => {
  // ... existing state declarations

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await authService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
        
        if (error.status === 409) {
          toast.error('Username or email already exists');
          setErrors({
            submit: 'Username or email already exists'
          });
        } else if (error.status === 400) {
          toast.error('Please check your input and try again');
          const validationErrors = {};
          if (error.details?.errors) {
            Object.entries(error.details.errors).forEach(([field, message]) => {
              validationErrors[field] = message;
            });
            setErrors(validationErrors);
          } else {
            setErrors({
              submit: error.message || 'Invalid registration data'
            });
          }
        } else {
          toast.error('Registration failed. Please try again later.');
          setErrors({
            submit: error.message || 'Registration failed. Please try again later.'
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ... rest of the component remains the same
};

export default Register; 