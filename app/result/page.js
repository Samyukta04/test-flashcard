'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Container, Box, Typography, CircularProgress } from '@mui/material'

const ResultPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return

      try {
        const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
        const sessionData = await res.json()

        if (res.ok) {
          setSession(sessionData)
        } else {
          setError(sessionData.error)
        }
      } catch (err) {
        setError('An error occurred while retrieving the session.')
      } finally {
        setLoading(false)
      }
    }

    fetchCheckoutSession()
  }, [session_id])

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container maxWidth="sm">
          <Box sx={{ 
            background: 'white', 
            borderRadius: 4, 
            p: 4,
            textAlign: 'center'
          }}>
            <Typography variant="h5" color="error">
              {error}
            </Typography>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container maxWidth="sm">
        <Box sx={{ 
          background: 'white', 
          borderRadius: 4, 
          p: 4,
          textAlign: 'center'
        }}>
          {session?.payment_status === 'paid' ? (
            <>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#667eea' }}>
                Thank you for your purchase!
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Session ID: {session_id}
              </Typography>
              <Typography variant="body1">
                We have received your payment. You will receive an email with the order details shortly.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#e53e3e' }}>
                Payment Failed
              </Typography>
              <Typography variant="body1">
                Your payment was not successful. Please try again.
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default ResultPage
