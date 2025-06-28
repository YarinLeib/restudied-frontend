import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/items/${id}`)
      .then((response) => setItem(response.data))
      .catch((error) => console.error('Error fetching item:', error));
  }, [id]);

  if (!item) {
    return <div className='text-center mt-20 text-gray-500'>Loading item...</div>;
  }

  return (
    <div className='mt-10 p-6 max-w-xl'>
      <button
        onClick={() => navigate('/items')}
        className='mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        ← Back to Items
      </button>

      <div className='bg-white rounded shadow p-6'>
        <img
          src={item.itemImage || 'https://via.placeholder.com/300'}
          alt={item.title}
          className='w-full h-64 object-contain rounded bg-gray-100'
        />
        <h1 className='text-2xl font-bold mt-4'>{item.title}</h1>
        <p className='mt-2 text-gray-700'>{item.itemDescription}</p>
        <p className='mt-2 text-sm text-gray-500'>Location: {item.itemLocation}</p>
        <p className='mt-2 text-sm text-gray-500'>Condition: {item.itemCondition}</p>
        {item.itemLanguage && <p className='mt-2 text-sm text-gray-500'>Language: {item.itemLanguage}</p>}
        <p className='mt-4'>
          <span className='text-sm text-gray-600'>Listed by: </span>
          <a href={`/users/${item.owner._id}`} className='text-blue-600 hover:underline text-sm'>
            {item.owner.username}
          </a>
        </p>
      </div>
    </div>
  );
}
