export function NotFound() {
  return (
    <div className='bg-gradient-to-br from-red-200 to-red-400 min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-red-800 mb-6'>404 Not Found</h1>
        <p className='text-center text-gray-700 mb-4'>The page you are looking for does not exist.</p>
        <p className='text-center text-gray-500'>Please check the URL or return to the home page.</p>
      </div>
    </div>
  );
}
