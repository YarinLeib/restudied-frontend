export function EditProfilePage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Edit Profile</h1>
      <form className='bg-white shadow-md rounded-lg p-6'>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='name'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter your name'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter your email'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300'
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
