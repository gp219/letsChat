import React, { useState } from 'react';
import io from 'socket.io-client'; // Import Socket.IO client
import './Chat.modue.css';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const socket = io('http://localhost:3001/chat', {
    withCredentials: true,
    extraHeaders: {
      
      "Access-Control-Allow-Origin": "*"
    
    },
    transports: ['websocket']
  }); // Replace with your Socket.IO server endpoint and namespace

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return; // Prevent sending empty messages

    // Emit message to server using Socket.IO
    socket.emit('sendMessage', { content: message });

    setMessage(''); // Clear input field after sending
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
