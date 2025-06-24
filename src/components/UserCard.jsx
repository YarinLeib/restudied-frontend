export function UserCard({ user }) {
  return (
    <div className='bg-white shadow-md rounded-lg p-4'>
      <div className='flex items-center space-x-4'>
        <img
          src={user.avatarUrl || '/default-avatar.png'}
          alt={`${user.name}'s avatar`}
          className='w-16 h-16 rounded-full'
        />
        <div>
          <h2 className='text-xl font-semibold'>{user.name}</h2>
          <p className='text-gray-600'>{user.email}</p>
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-gray-700'>{user.bio}</p>
      </div>
    </div>
  );
}
