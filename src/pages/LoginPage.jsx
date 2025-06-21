export function LoginPage() {
  return (
    <div className='bg-gradient-to-br from-blue-200 to-blue-400 min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-blue-800 mb-6'>Login</h1>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='username'>
              Username
            </label>
            <input
              type='text'
              id='username'
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your username'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
