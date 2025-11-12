'use client'

// Polyfill for Promise.withResolvers (required for react-pdftotext)
if (typeof Promise.withResolvers === 'undefined') {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase'
import { doc, collection, setDoc, getDoc, writeBatch } from 'firebase/firestore'
import pdfToText from 'react-pdftotext'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  Grid,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab,
  Chip,
} from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import TextFieldsIcon from '@mui/icons-material/TextFields'

export default function Generate() {
  const { user, loading } = useAuth()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [extracting, setExtracting] = useState(false)
  const fileInputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }

    setUploadedFile(file)
    setExtracting(true)

    try {
      const extractedText = await pdfToText(file)
      setText(extractedText)
      alert('PDF text extracted successfully!')
    } catch (error) {
      console.error('Error extracting PDF:', error)
      alert('Failed to extract text from PDF. Please try copying and pasting the text manually.')
    } finally {
      setExtracting(false)
    }
  }

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text or upload a PDF')
      return
    }

    setGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })
      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('Error generating flashcards')
    } finally {
      setGenerating(false)
    }
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const saveFlashcards = async () => {
    if (!name.trim()) {
      alert('Please enter a name')
      return
    }

    if (!user) {
      alert('You must be signed in to save flashcards')
      return
    }

    try {
      const batch = writeBatch(db)
      const userDocRef = doc(collection(db, 'users'), user.uid)
      const docSnap = await getDoc(userDocRef)

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        if (collections.find((f) => f.name === name)) {
          alert('Flashcard collection with the same name already exists.')
          return
        } else {
          collections.push({ name })
          batch.set(userDocRef, { flashcards: collections }, { merge: true })
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] })
      }

      const colRef = collection(userDocRef, name)
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
      })

      await batch.commit()
      setOpen(false)
      alert('Flashcards saved successfully!')
      router.push('/flashcards')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('Error saving flashcards')
    }
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
      {/* Animated Background Orbs */}
      <Box
        sx={{
          position: 'fixed',
          top: '10%',
          right: '-10%',
          width: '600px',
          height: '600px',
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
          bottom: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 25s ease-in-out infinite reverse',
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: '40%',
          left: '30%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 30s ease-in-out infinite',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 2 }}>
            Generate Flashcards
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
            Paste your text or upload a PDF to create flashcards with AI
          </Typography>
        </Box>

        <Box sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          mb: 4,
        }}>
          {/* Tabs for Text/PDF */}
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              mb: 3,
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                '&.Mui-selected': {
                  color: '#667eea',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#667eea',
              },
            }}
          >
            <Tab icon={<TextFieldsIcon />} iconPosition="start" label="Text Input" />
            <Tab icon={<UploadFileIcon />} iconPosition="start" label="Upload PDF" />
          </Tabs>

          {/* Text Input Tab */}
          {tabValue === 0 && (
            <Box>
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your study notes, lecture content, or any text here..."
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.3)',
                  },
                }}
              />
            </Box>
          )}

          {/* PDF Upload Tab */}
          {tabValue === 1 && (
            <Box>
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              <Box
                onClick={() => !extracting && fileInputRef.current?.click()}
                sx={{
                  border: '2px dashed rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  p: 6,
                  textAlign: 'center',
                  cursor: extracting ? 'default' : 'pointer',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s ease',
                  mb: 3,
                  '&:hover': {
                    borderColor: extracting ? 'rgba(255,255,255,0.2)' : 'rgba(102, 126, 234, 0.5)',
                    background: extracting ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                  }
                }}
              >
                {extracting ? (
                  <Box>
                    <CircularProgress sx={{ color: '#667eea', mb: 2 }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Extracting text from PDF...
                    </Typography>
                  </Box>
                ) : uploadedFile ? (
                  <Box>
                    <UploadFileIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                    <Typography sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
                      {uploadedFile.name}
                    </Typography>
                    <Chip
                      label="✓ Text extracted successfully!"
                      sx={{
                        mb: 2,
                        bgcolor: 'rgba(76, 175, 80, 0.2)',
                        color: '#4caf50',
                        border: '1px solid rgba(76, 175, 80, 0.3)',
                      }}
                    />
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                      Click to upload another PDF
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <UploadFileIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                      Click to upload PDF
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
                      or drag and drop your PDF file here
                    </Typography>
                  </Box>
                )}
              </Box>

              {text && (
                <Box sx={{
                  p: 3,
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.1)',
                  mb: 3,
                }}>
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2 }}>
                    Extracted Text Preview:
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.9rem',
                      maxHeight: '150px',
                      overflow: 'auto',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {text.substring(0, 500)}{text.length > 500 ? '...' : ''}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={generating || !text.trim()}
            startIcon={generating ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
            fullWidth
            sx={{
              bgcolor: '#667eea',
              color: 'white',
              py: 1.8,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#764ba2',
              },
              '&:disabled': {
                bgcolor: 'rgba(102, 126, 234, 0.3)',
                color: 'rgba(255,255,255,0.5)',
              }
            }}
          >
            {generating ? 'Generating...' : 'Generate Flashcards'}
          </Button>
        </Box>

        {flashcards.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                Your Flashcards ({flashcards.length})
              </Typography>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  bgcolor: 'rgba(102, 126, 234, 0.8)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  px: 3,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(118, 75, 162, 0.8)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                  }
                }}
              >
                Save Collection
              </Button>
            </Box>

            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    onClick={() => handleCardClick(index)}
                    sx={{
                      height: '280px',
                      cursor: 'pointer',
                      perspective: '1000px',
                      bgcolor: 'transparent',
                      position: 'relative',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
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
                          p: 3,
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: 3,
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'white',
                            textAlign: 'center',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
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
                          p: 3,
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: 3,
                          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'white',
                            textAlign: 'center',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          {flashcard.back}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              bgcolor: 'rgba(26, 26, 26, 0.95)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
            }
          }}
        >
          <DialogTitle>Save Flashcard Collection</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
              Enter a name for this flashcard collection
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Biology Chapter 5"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Cancel
            </Button>
            <Button
              onClick={saveFlashcards}
              variant="contained"
              sx={{
                bgcolor: '#667eea',
                '&:hover': { bgcolor: '#764ba2' }
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}
