"use client";

import { signInWithGoogle } from "./firebase";
import { useAuth } from './context/AuthContext';
import { Button, Container, Box, Grid, Typography, Chip } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0a0a0a' }}>
        <Typography variant="h5" sx={{ color: 'white' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#0a0a0a', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Gradient Orbs */}
      <Box
        sx={{
          position: 'fixed',
          top: '-50%',
          right: '-20%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(-100px, 100px)' },
          }
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: '-30%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 25s ease-in-out infinite reverse',
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 30s ease-in-out infinite',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ pt: { xs: 10, md: 15 }, pb: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Chip 
            label="✨ AI-Powered Flashcards" 
            sx={{ 
              mb: 4,
              px: 2,
              py: 2.5,
              fontSize: '0.9rem',
              fontWeight: 600,
              background: 'rgba(102, 126, 234, 0.15)',
              backdropFilter: 'blur(10px)',
              color: '#667eea',
              border: '1px solid rgba(102, 126, 234, 0.3)',
            }}
          />
          
          <Typography
            sx={{
              fontSize: { xs: '3rem', sm: '5rem', md: '7rem', lg: '9rem' },
              fontWeight: 700,
              lineHeight: 0.9,
              mb: 4,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Learn
            <br />
            Smarter
          </Typography>

          <Typography
            variant="h5"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              mb: 5,
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.6,
            }}
          >
            Transform any text into interactive flashcards with AI.
            Study efficiently, remember everything.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              size="large"
              onClick={() => user ? router.push('/generate') : handleSignIn()}
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                px: 4,
                py: 1.8,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)',
                },
              }}
            >
              Get Started Free
            </Button>
            <Button
              size="large"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                px: 4,
                py: 1.8,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                },
              }}
            >
              See Features
            </Button>
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center', mt: 10, flexWrap: 'wrap' }}>
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '500K+', label: 'Flashcards Created' },
              { value: '99%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <Box key={i} sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#667eea', mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Features Section */}
        <Box id="features" sx={{ py: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 8,
              textAlign: 'center',
              color: 'white',
            }}
          >
            Why Choose Us?
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <AutoAwesomeIcon sx={{ fontSize: 50 }} />,
                title: 'AI-Powered Generation',
                desc: 'Our advanced AI analyzes your text and creates perfectly structured flashcards in seconds.',
              },
              {
                icon: <SpeedIcon sx={{ fontSize: 50 }} />,
                title: 'Lightning Fast',
                desc: 'Generate hundreds of flashcards in seconds. No more manual card creation.',
              },
              {
                icon: <DevicesIcon sx={{ fontSize: 50 }} />,
                title: 'Study Anywhere',
                desc: 'Access your flashcards on any device. Desktop, tablet, or mobile.',
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    p: 5,
                    height: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 60px rgba(102, 126, 234, 0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      color: '#667eea',
                      mb: 3,
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                    {feature.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            py: { xs: 10, md: 15 },
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              background: 'rgba(102, 126, 234, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                color: 'white',
              }}
            >
              Ready to transform your learning?
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                mb: 5,
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Join thousands of students and professionals using AI to study smarter.
            </Typography>
            <Button
              size="large"
              onClick={() => user ? router.push('/generate') : handleSignIn()}
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                px: 5,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)',
                },
              }}
            >
              Start Creating Now
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 6,
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          © 2025 Flashcard SaaS. Built with Next.js & AI.
        </Typography>
      </Box>
    </Box>
  );
}
