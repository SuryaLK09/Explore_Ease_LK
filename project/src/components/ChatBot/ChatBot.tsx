import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { processUserMessage } from '../../utils/chatbotUtils';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hi! I'm your travel assistant. I can help you find flights and hotels. How can I assist you today?", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setIsTyping(true);

    // Process message and get bot response
    const botResponse = await processUserMessage(message);
    
    // Add bot response with typing effect
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-colors duration-200 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isOpen ? (
          <X className="text-white" size={24} />
        ) : (
          <MessageSquare className="text-white" size={24} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border">
          {/* Header */}
          <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <h3 className="font-semibold">Travel Assistant</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isBot={msg.isBot} />
            ))}
            {isTyping && (
              <div className="flex gap-2 text-gray-500">
                <div className="animate-bounce">●</div>
                <div className="animate-bounce delay-100">●</div>
                <div className="animate-bounce delay-200">●</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      )}
    </div>
  );
}