import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

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
    <div className='max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow'>
      <img
        src={item.itemImage || 'https://via.placeholder.com/300'}
        alt={item.title}
        className='w-full h-64 object-cover rounded'
      />
      <h1 className='text-2xl font-bold mt-4'>{item.title}</h1>
      <p className='mt-2 text-gray-700'>{item.itemDescription}</p>
      <p className='mt-2 text-sm text-gray-500'>Location: {item.itemLocation}</p>
      <p className='mt-2 text-sm text-gray-500'>Condition: {item.itemCondition}</p>
    </div>
  );
}
