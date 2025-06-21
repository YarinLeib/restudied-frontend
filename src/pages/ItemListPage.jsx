import { useState, useEffect } from 'react';
import axios from 'axios';
import { ItemCard } from '../components/ItemCard';

export function ItemListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5005/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen p-8'>
      <h1 className='text-3xl font-bold text-center mb-6'>Available Items</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
