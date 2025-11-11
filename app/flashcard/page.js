'use client'

import { useAuth } from "../context/AuthContext"
import { useEffect, useState, Suspense } from "react"
import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Container,
  Box,
  Typography,
  Card,
  Grid,
  CircularProgress,
  IconButton,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function FlashcardContent() {
  const { user, loading } = useAuth()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const router = useRouter()
  
  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return
      
      try {
        const colRef = collection(doc(collection(db, 'users'), user.uid), search)
        const docs = await getDocs(colRef)
        const flashcards = []
        
        docs.forEach((doc) => {
          flashcards.push({ id: doc.id, ...doc.data() })
        })
        setFlashcards(flashcards)
      } catch (error) {
        console.error('Error fetching flashcard:', error)
      }
    }
    getFlashcard()
  }, [user, search])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0a0a0a' }}>
        <CircularProgress sx={{ color: '#667eea' }} />
      </Box>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', py: 6, position: 'relative', overflow: 'hidden' }}>
      {/* Background Orbs */}
      <Box
        sx={{
          position: 'fixed',
          top: '-10%',
          right: '20%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(60px, 60px) scale(1.1)' },
          }
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: '20%',
          left: '10%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 26s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton 
            onClick={() => router.push('/flashcards')}
            sx={{ 
              color: 'white',
              mr: 2,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'white' }}>
              {search}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
              {flashcards.length} cards
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                onClick={() => handleCardClick(index)}
                sx={{
                  height: '260px',
                  cursor: 'pointer',
                  position: 'relative',
                  borderRadius: 3,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0)',
                  }}
                >
                  {/* Front */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 4,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 3,
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <Typography 
                      sx={{ 
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        textAlign: 'center',
                        lineHeight: 1.6,
                      }}
                    >
                      {flashcard.front}
                    </Typography>
                  </Box>
                  {/* Back */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 4,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                    }}
                  >
                    <Typography 
                      sx={{ 
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        textAlign: 'center',
                        lineHeight: 1.6,
                      }}
                    >
                      {flashcard.back}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default function Flashcard() {
  return (
    <Suspense fallback={
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0a0a0a' }}>
        <CircularProgress sx={{ color: '#667eea' }} />
      </Box>
    }>
      <FlashcardContent />
    </Suspense>
  )
}
