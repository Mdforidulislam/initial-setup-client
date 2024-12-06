import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGetingUserQuery } from '../../../Redux/Features/Api/userApi';

interface Message {
  sender: string;
  recipient: string;
  content: string;
}

const SOCKET_SERVER_URL = 'http://localhost:5000';

const LiveChat: React.FC = () => {
  const { data: user } = useGetingUserQuery(undefined);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState<string>(user?.user_name);
  const [recipient, setRecipient] = useState<string>('foridul');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      path: '/socket.io',
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    newSocket.on('messageReceived', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    setUsername(user?.user_name);
  }, [user]);

  const handleRegisterUser = () => {
    if (username) {
      socket?.emit('registerUser', username);
      console.log(`${username} registered`);
    }
  };

  const handleSendMessage = () => {
    if (message && recipient) {
      const messageData: Message = {
        sender: username,
        recipient,
        content: message,
      };
      socket?.emit('sendMessage', messageData);
      setMessage('');
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-6 border-r border-gray-300 ">
        <h2 className="text-2xl font-bold mb-4">User Registration</h2>
        <input
          type="text"
          value={user?.user_name}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleRegisterUser}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 mb-4"
        >
          Register
        </button>

        <h2 className="text-lg font-bold mb-2">Recipient</h2>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient's username (default: foridul)"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white p-4">
        <div className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-md mb-4 shadow-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Messages:</h2>
          <div className="space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  msg.sender === username ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Display message if the recipient matches the current user or if it's sent by the current user */}
                {(msg.recipient === username || msg.sender === username) && (
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                      msg.sender === username ? 'bg-green-100 text-right' : 'bg-gray-200 text-left'
                    }`}
                  >
                    <strong className="block text-blue-600 mb-1">
                      {msg.sender === username ? 'You' : msg.sender}:
                    </strong>
                    <span>{msg.content}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
