export function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-4 mt-8'>
      <div className='container mx-auto text-center'>
        <p className='text-sm'>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <p className='text-xs mt-2'>Built with ❤️ using React, Tailwind CSS, and Material UI.</p>
      </div>
    </footer>
  );
}
