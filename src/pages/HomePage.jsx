import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className='bg-yellow-300 text-blue-700 p-10 text-center min-h-screen'>
      <h1 className='text-4xl font-bold'>Tailwind is Working 🎉</h1>
      <p className='text-lg mt-4'>Styled with Tailwind CSS</p>

      <Link
        to='/items'
        className='mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
      >
        Go to Item List
      </Link>
    </div>
  );
}
