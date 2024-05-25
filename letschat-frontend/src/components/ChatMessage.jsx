import './Chat.modue.css';
const ChatMessage = ({ message }) => {
    return (
      <li className="chat-message">
        <span className="chat-username">{message.sender}</span>
        <p>{message.content}</p>
        <span className="chat-timestamp">{message.timestamp}</span>
      </li>
    );
  };
  
  export default ChatMessage;
  