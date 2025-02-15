import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isBot ? 'bg-blue-50 text-gray-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {message}
      </div>
    </div>
  );
}