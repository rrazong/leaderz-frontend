import React from 'react';
import type { ChatMessage } from '../types';

interface ChatProps {
  messages: ChatMessage[];
}

const goldColor = '#ffe14d';

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <div className="p-4 bg-gray-50" style={{ borderTop: 'none' }}>
      <h3 className="text-lg font-bold mb-2" style={{ color: goldColor }}>Live Chat</h3>
      <div className="h-64 overflow-y-auto flex flex-col-reverse">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
            <div className="text-4xl">💬</div>
            <div className="text-lg font-semibold">No Messages Yet!</div>
            <div className="text-sm text-center">The chat is as quiet as a library during a putting contest...</div>
            <div className="text-xs text-gray-400">Be the first to break the silence!</div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            {messages.map(msg => (
              <div key={msg.id} className="text-left" style={{ color: goldColor }}>
                <span style={{ fontWeight: 900, marginRight: '0.5em' }}>{msg.team_name || 'Unknown Team'}</span>
                <span className="italic">{msg.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat; 