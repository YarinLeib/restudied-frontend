export function ProfilePage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Profile Page</h1>
      <p className='text-gray-700 mb-2'>This is the profile page.</p>
      <p className='text-gray-500'>You can add more details about the user here.</p>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold mb-2'>User Information</h2>
        <p className='text-gray-700'>Name: John Doe</p>
        <p className='text-gray-700'>Email:</p>
        <p className='text-gray-700'>Location: New York, USA</p>
        <p className='text-gray-700'>
          Bio: A brief bio about the user goes here. This can include interests, hobbies, or any other relevant
          information.
        </p>
      </div>
      <div className='mt-6'>
        <h2 className='text-xl font-semibold mb-2'>User Items</h2>
        <p className='text-gray-700'>Here you can display items related to the user.</p>
        {/* You can map through user items and display them here */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {/* Example item card */}
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h3 className='text-lg font-semibold'>Item Title</h3>
            <p className='text-gray-500'>Item description goes here.</p>
          </div>
          {/* Repeat for more items */}
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h3 className='text-lg font-semibold'>Another Item</h3>
            <p className='text-gray-500'>Description of another item.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
