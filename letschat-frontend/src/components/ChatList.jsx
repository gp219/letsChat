import React from 'react';
import ChatMessage from './ChatMessage';
import './Chat.modue.css';

const ChatList = ({ messages }) => {
  return (
    <ul className="chat-list">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </ul>
  );
};

export default ChatList;
