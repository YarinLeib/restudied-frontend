export function SignupPage() {
  return (
    <div className='bg-gradient-to-br from-green-200 to-green-400 min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-green-800 mb-6'>Sign Up</h1>
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
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your email'
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
            className='w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
