import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export function Navbar() {
  const { isLoggedIn, user, logout, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  return (
    <nav className='bg-gray-800 text-white p-4 flex justify-between'>
      <Link to='/'>Home</Link>

      <div className='space-x-4'>
        {isLoggedIn ? (
          <>
            <span>Welcome, {user?.name}</span>
            <button onClick={logout} className='bg-red-600 px-3 py-1 rounded'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
