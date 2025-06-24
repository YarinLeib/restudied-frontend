export function RequestCard({ request, onAccept, onReject }) {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
      <h2 className='text-xl font-semibold mb-2'>{request.itemName}</h2>
      <p className='text-gray-700 mb-2'>Requested by: {request.requesterName}</p>
      <p className='text-gray-600 mb-4'>Message: {request.message}</p>
      <div className='flex justify-end space-x-2'>
        <button
          onClick={() => onAccept(request.id)}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request.id)}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          Reject
        </button>
      </div>
    </div>
  );
}
