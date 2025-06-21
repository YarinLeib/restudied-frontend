import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export function LoginPage() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/auth/login', formData);
      storeToken(res.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='bg-gradient-to-br from-blue-200 to-blue-400 min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-blue-800 mb-6'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
