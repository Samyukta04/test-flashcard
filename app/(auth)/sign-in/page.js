"use client";

import { AppBar, Container, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <AppBar position="static" sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: 'white' }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit" sx={{ color: 'white', mr: 2 }}>
            <Link href="/sign-in" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              Login
            </Link>
          </Button>
          <Button variant="contained" sx={{ background: 'white', color: '#667eea' }}>
            <Link href="/sign-up" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          py: 4
        }}>
          <Box sx={{ 
            background: 'white', 
            borderRadius: 4, 
            p: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            width: '100%'
          }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 700, color: '#667eea' }}>
              Sign In
            </Typography>
            <SignIn />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
