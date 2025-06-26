import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function SignupPage() {
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, username, name: username };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        return axios.post(`${API_URL}/auth/login`, { email, password });
      })
      .then((res) => {
        const { authToken } = res.data;
        storeToken(authToken);
        authenticateUser();
        navigate('/items');
      })

      .catch((err) => {
        const msg = err.response?.data?.message || 'Signup/Login failed';
        setErrorMessage(msg);
      });
  };

  return (
    <div className='bg-gradient-to-br from-green-200 to-green-400 min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-green-800 mb-6'>Sign Up</h1>
        <form onSubmit={handleSignupSubmit} className='space-y-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='username'>
              Username
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={handleUsername}
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
              value={email}
              onChange={handleEmail}
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
              value={password}
              onChange={handlePassword}
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
        {errorMessage && (
          <div className='mt-4 text-red-600 text-center'>
            <p>{errorMessage}</p>
          </div>
        )}
        <div className='mt-4 text-center'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <Link to='/login' className='text-green-600 hover:underline'>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
