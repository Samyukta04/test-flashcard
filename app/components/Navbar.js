'use client';

import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../firebase';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
      handleClose();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
    handleClose();
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Toolbar sx={{ py: 1.5 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700, 
            cursor: 'pointer',
            color: 'white',
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            textShadow: '0 2px 10px rgba(102, 126, 234, 0.5)',
          }}
          onClick={() => handleNavigation('/')}
        >
          Flashcard SaaS
        </Typography>

        {user ? (
          <>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              <Button 
                onClick={() => handleNavigation('/generate')}
                sx={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontWeight: 500,
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Generate
              </Button>
              <Button 
                onClick={() => handleNavigation('/flashcards')}
                sx={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontWeight: 500,
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                My Flashcards
              </Button>
              
              <Button
                onClick={handleMenu}
                sx={{ 
                  ml: 1, 
                  minWidth: 'auto',
                  p: 0.5,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <Avatar 
                  src={user.photoURL} 
                  alt={user.displayName}
                  sx={{ 
                    width: 38, 
                    height: 38,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                  }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    bgcolor: 'rgba(26, 26, 26, 0.95)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    mt: 1,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }
                }}
              >
                <MenuItem disabled sx={{ opacity: 0.9 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.displayName}</Typography>
                </MenuItem>
                <MenuItem disabled sx={{ opacity: 0.6 }}>
                  <Typography variant="caption">{user.email}</Typography>
                </MenuItem>
                <MenuItem 
                  onClick={handleSignOut} 
                  sx={{ 
                    color: '#667eea', 
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'rgba(102, 126, 234, 0.1)',
                    }
                  }}
                >
                  Sign Out
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Button
                onClick={handleMobileMenu}
                sx={{ 
                  color: 'white',
                  minWidth: 'auto',
                  fontSize: '1.5rem',
                }}
              >
                ☰
              </Button>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    bgcolor: 'rgba(26, 26, 26, 0.95)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                  }
                }}
              >
                <MenuItem onClick={() => handleNavigation('/generate')}>Generate</MenuItem>
                <MenuItem onClick={() => handleNavigation('/flashcards')}>My Flashcards</MenuItem>
                <MenuItem onClick={handleSignOut} sx={{ color: '#667eea' }}>Sign Out</MenuItem>
              </Menu>
            </Box>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
