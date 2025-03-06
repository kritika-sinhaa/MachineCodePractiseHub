import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed"
        sx={{ 
          background: '#1a1a1a !important',
          backgroundImage: 'none !important',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar 
            sx={{ 
              minHeight: '60px !important',
              background: '#1a1a1a !important',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {/* Left Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  mr: 4
                }}
                onClick={() => navigate('/')}
              >
                <CodeIcon sx={{ color: '#ffa116', mr: 1 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Machine Coding
                </Typography>
              </Box>

              <Button
                sx={{
                  color: '#ffffff !important',
                  fontSize: '0.9rem',
                  minWidth: 'auto',
                  px: 2,
                  py: 1,
                  '&:hover': { 
                    color: '#ffa116 !important',
                    backgroundColor: 'rgba(255, 161, 22, 0.1)'
                  }
                }}
                onClick={() => navigate('/topics')}
              >
                Problems
              </Button>
            </Box>

            {/* Right Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                sx={{
                  color: '#ffffff !important',
                  fontSize: '0.9rem',
                  '&:hover': { 
                    color: '#ffa116 !important',
                    backgroundColor: 'rgba(255, 161, 22, 0.1)'
                  }
                }}
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#ffa116 !important',
                  color: '#ffffff !important',
                  '&:hover': { 
                    bgcolor: '#ff9100 !important',
                    boxShadow: '0 2px 8px rgba(255, 161, 22, 0.4)'
                  },
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  fontWeight: 500
                }}
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar /> {/* Spacer */}
    </Box>
  );
};

export default Header; 