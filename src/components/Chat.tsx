import React from 'react';
import type { ChatMessage } from '../types';

interface ChatProps {
  messages: ChatMessage[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <h3 className="text-lg font-bold mb-2">Live Chat</h3>
      <div className="h-64 overflow-y-auto flex flex-col-reverse">
        <ul>
          {messages.map(msg => (
            <li key={msg.id} className="mb-2">
              <span className="font-semibold">{msg.team_name || 'Unknown Team'}: </span>
              <span>{msg.message}</span>
              <span className="text-xs text-gray-500 ml-2">{new Date(msg.created_at).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat; 