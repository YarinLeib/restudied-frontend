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
            <span className='text-sm'>Welcome, {user?.username || user?.name}</span>
            <Link to='/profile' className='bg-blue-600 px-3 py-1 rounded hover:bg-blue-700'>
              Profile
            </Link>
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
