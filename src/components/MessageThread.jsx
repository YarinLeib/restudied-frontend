import React from 'react';

function MessageThread({ messages, currentUserId }) {
  return (
    <div className='space-y-2'>
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`p-2 rounded max-w-xs ${msg.sender === currentUserId ? 'bg-blue-200 self-end' : 'bg-gray-200'}`}
        >
          <p>{msg.content}</p>
          <small className='text-xs text-gray-500'>{new Date(msg.createdAt).toLocaleTimeString()}</small>
        </div>
      ))}
    </div>
  );
}

export default MessageThread;
