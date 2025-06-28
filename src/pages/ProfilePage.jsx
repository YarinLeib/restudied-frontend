import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { ItemCard } from '../components/ItemCard';

export function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5005/api/items/my-items', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((res) => {
        console.log('Fetched items:', res.data);
        setItems(res.data);
      })
      .catch((err) => console.error('Failed to fetch items:', err));
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div>
        <img
          src={user?.profileImage}
          alt='Profile'
          className='w-32 h-32 rounded-full border-2 border-gray-300 shadow-md object-cover'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-profile.png';
          }}
        />
      </div>
      <h1 className='text-2xl font-bold mb-4'>{user?.username}</h1>

      <div className='mt-6'>
        <p className='text-gray-700'>{user?.name}</p>
        <p className='text-gray-700'>{user?.email}</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {items.length === 0 ? (
          <p className='text-gray-500 col-span-full'>No items yet.</p>
        ) : (
          items.map((item) => <ItemCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}
