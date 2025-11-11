'use client'

import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from "react"
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from '../firebase'
import { useRouter } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, CircularProgress } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'

export default function Flashcards() {
  const { user, loading } = useAuth()
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      
      try {
        const docRef = doc(collection(db, 'users'), user.uid)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || []
          setFlashcards(collections)
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error)
      }
    }
    getFlashcards()
  }, [user])

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
      {/* Animated Background Orbs */}
      <Box
        sx={{
          position: 'fixed',
          top: '20%',
          right: '-15%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240, 147, 251, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 22s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(-80px, 80px)' },
          }
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: '0%',
          left: '0%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 28s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 2 }}>
            My Flashcard Collections
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
            {flashcards.length} {flashcards.length === 1 ? 'collection' : 'collections'} saved
          </Typography>
        </Box>

        {flashcards.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 10,
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 3,
          }}>
            <FolderIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.2)', mb: 2 }} />
            <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1 }}>
              No flashcards yet
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.3)' }}>
              Create your first collection in the Generate page
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderColor: 'rgba(102, 126, 234, 0.4)',
                      boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
                    }
                  }}
                >
                  <CardActionArea onClick={() => router.push(`/flashcard?id=${flashcard.name}`)}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ 
                        display: 'inline-flex',
                        p: 2,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        mb: 2,
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                      }}>
                        <FolderIcon sx={{ fontSize: 32, color: '#667eea' }} />
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 600, 
                          color: 'white', 
                          wordBreak: 'break-word',
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {flashcard.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
