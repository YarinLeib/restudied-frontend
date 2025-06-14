import './App.css';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-4'>
      <h1 className='text-3xl font-bold text-blue-800'>✅ Tailwind is working</h1>

      <Button variant='contained' color='primary'>
        MUI Button Test
      </Button>
    </div>
  );
}

export default App;
