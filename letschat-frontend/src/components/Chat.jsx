import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import io from 'socket.io-client'; // Import Socket.IO client
import './Chat.modue.css'; // Import your CSS file

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:3001/chat',{
    withCredentials: true,
    extraHeaders: {
      "Access-Control-Allow-Origin": "*"
    },
    transports: ['websocket']
  }); // Replace with your server URL and namespace

  useEffect(() => {
    const handleConnect = () => {
      console.log('Connected to Socket.IO server');
    };

    const handleDisconnect = () => {
      console.log('Disconnected from Socket.IO server');
    };

    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('receiveMessage', handleReceiveMessage);

    // Cleanup function to remove event listeners on component unmount
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket]);

  const handleSendMessage = async (message) => {
    socket.emit('sendMessage', { recipientUsername: '', content: message }); // Assuming no recipient selection for now
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
