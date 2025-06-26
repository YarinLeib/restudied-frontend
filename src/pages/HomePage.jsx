import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export function HomePage() {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/background1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        py: 4,
        textAlign: 'center',
      }}
    >
      <Box display='flex' flexDirection='column' alignItems='center' gap={15}>
        <Box>
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
              color: 'white',
            }}
          >
            Welcome to ReStudied
          </Typography>
          <Typography
            variant='h5'
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.7rem' },
              fontWeight: 400,
              color: '#f0f0f0',
            }}
          >
            Your platform to swap and share student supplies.
          </Typography>
        </Box>

        <Box
          display='flex'
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={15}
          maxWidth='700px'
          width='100%'
          justifyContent='center'
          alignItems='center'
          pb='5vh'
        >
          <Box display='flex' flexDirection='column' gap={2} width={{ xs: '100%', md: 'auto' }} alignItems='center'>
            <Button
              component={Link}
              to='/login'
              variant='contained'
              color='primary'
              size='large'
              fullWidth
              sx={{ px: 6, py: 3, fontSize: '1rem' }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to='/signup'
              variant='contained'
              size='large'
              fullWidth
              sx={{
                px: 6,
                py: 3,
                fontSize: '1rem',
                color: 'white',
                backgroundColor: '#FF5722',
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Box width={{ xs: '100%', md: 'auto' }} textAlign='center'>
            <Button
              component={Link}
              to='/items'
              variant='contained'
              size='large'
              fullWidth
              sx={{
                px: 6,
                py: 6,
                fontSize: '1.25rem',
                backgroundColor: '#52b202',
                color: 'white',
              }}
            >
              Browse Items
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
