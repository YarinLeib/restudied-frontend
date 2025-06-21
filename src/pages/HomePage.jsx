import { Button, Card, CardContent, Typography, Container, Alert } from '@mui/material';

export function HomePage() {
  return (
    <div className='bg-gradient-to-br from-yellow-200 to-yellow-400 min-h-screen flex items-center justify-center'>
      <Container maxWidth='sm'>
        {/* Tailwind heading */}
        <h1 className='text-4xl font-bold text-center text-blue-800 mb-6'>Tailwind + MUI 🎉</h1>

        {/* MUI Alert */}
        <Alert severity='info' className='mb-6'>
          This is an MUI Alert inside a Tailwind layout!
        </Alert>

        {/* MUI Card */}
        <Card>
          <CardContent>
            <Typography variant='h5' component='div' gutterBottom>
              This is a Material UI Card
            </Typography>
            <Typography color='text.secondary'>It's centered using Tailwind, and styled using MUI props.</Typography>

            {/* MUI Button */}
            <div className='mt-4 text-center'>
              <Button variant='contained' color='primary'>
                MUI Button
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
