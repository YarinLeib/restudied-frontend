import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export function Navbar() {
  const { isLoggedIn, user, logout, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  return (
    <nav className='bg-gray-800 text-white p-4 flex justify-between items-center'>
      <Link to='/' className='text-xl font-semibold'>
        ReStudied
      </Link>

      <div className='flex items-center space-x-4'>
        {isLoggedIn ? (
          <>
            <div className='relative group'>
              <button
                className='bg-blue-600 px-3 py-1 rounded cursor-pointer text-white hover:bg-blue-700 transition'
                type='button'
              >
                {user?.username || user?.name}
              </button>

              <div
                tabIndex={0}
                className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg
    opacity-0 invisible group-hover:opacity-100 group-hover:visible
    transition-all duration-200 z-50'
              >
                <Link to='/profile' className='block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800'>
                  View My Profile
                </Link>
                <Link
                  to='/edit-profile'
                  className='block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                >
                  Edit Profile
                </Link>
                <Link to='/my-items' className='block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800'>
                  My Items
                </Link>
                <Link to='/messages' className='block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800'>
                  Messages
                </Link>
                <Link to='/requests' className='block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800'>
                  Requests
                </Link>
              </div>
            </div>

            <button onClick={logout} className='bg-red-600 px-3 py-1 rounded hover:bg-red-700'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='hover:underline'>
              Login
            </Link>
            <Link to='/signup' className='hover:underline'>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
