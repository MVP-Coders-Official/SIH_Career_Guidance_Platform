import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, MessageCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AIChatbot = () => {
  const { user, quizResults } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hello${user?.name ? ` ${user.name}` : ''}! I'm your AI career advisor. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPersonalizedResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Personalized responses based on user data
    const userStream = user?.stream || quizResults?.recommendedStream || 'general';
    const userLocation = user?.location || 'Jammu & Kashmir';
    const userClass = user?.currentClass || '12th';

    if (lowerMessage.includes('course') || lowerMessage.includes('degree')) {
      return `Based on your profile, I recommend exploring ${userStream} stream courses. For ${userClass} students in ${userLocation}, some great options include B.Sc., B.A., B.Com., and specialized programs like B.Sc. Agriculture which is very relevant for J&K. Would you like me to suggest specific courses?`;
    }

    if (lowerMessage.includes('college') || lowerMessage.includes('university')) {
      return `For students in ${userLocation}, I highly recommend these top universities: University of Kashmir, University of Jammu, SKUAST, and IUST. Each offers excellent programs in ${userStream} stream. Would you like detailed information about any specific university?`;
    }

    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return `Great question! With a ${userStream} background, you have excellent career opportunities in J&K and beyond. You could pursue government jobs through J&K PSC, work in agriculture (very relevant for J&K), or explore technology careers. What specific career path interests you?`;
    }

    if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial')) {
      return `There are several scholarship opportunities for J&K students! You can apply for Central Sector Scholarships, state government scholarships, and university-specific grants. The application deadlines are usually in June-July. Would you like me to help you find specific scholarships?`;
    }

    if (lowerMessage.includes('exam') || lowerMessage.includes('entrance')) {
      return `For ${userClass} students, important exams include J&K CET, JEE Main, NEET, and various university entrance tests. The J&K CET is particularly important for local universities. When are you planning to appear for these exams?`;
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('guidance')) {
      return `I'm here to help you with career guidance, course selection, college information, exam preparation, and scholarship opportunities. I can provide personalized advice based on your interests and academic background. What specific area would you like to explore?`;
    }

    // Default responses
    const defaultResponses = [
      "That's an interesting question! Could you provide more details so I can give you a more specific answer?",
      "I'd be happy to help you with that. Let me know more about your specific situation or requirements.",
      "Based on your profile, I can suggest some personalized options. What aspect would you like to focus on?",
      "Great question! For students in Jammu & Kashmir, there are many opportunities. Could you tell me more about your interests?",
      "I can help you with career guidance, course selection, or college information. What would you like to know more about?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      content: getPersonalizedResponse(inputMessage),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={`ai-chat-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Chatbot"
      >
        {isOpen ? <X className="toggle-icon" /> : <MessageCircle className="toggle-icon" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`ai-chatbot ${isMinimized ? 'minimized' : ''}`}>
          <div className="chat-header">
            <div className="chat-title">
              <Bot className="chat-icon" />
              <div>
                <h3>AI Career Advisor</h3>
                <p>Your personalized guidance assistant</p>
              </div>
            </div>
            <div className="chat-controls">
              <button
                className="minimize-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                aria-label="Minimize chat"
              >
                <Minimize2 className="control-icon" />
              </button>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X className="control-icon" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chat-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.type}`}
                  >
                    <div className="message-content">
                      <p>{message.content}</p>
                      <span className="message-time">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message bot">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your career..."
                  className="message-input"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="send-btn"
                >
                  <Send className="send-icon" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        .ai-chat-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .ai-chat-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
        }

        .ai-chat-toggle.active {
          background: var(--danger-color);
        }

        .toggle-icon {
          width: 24px;
          height: 24px;
        }

        .ai-chatbot {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 350px;
          height: 500px;
          background: var(--card-bg);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          border: 1px solid var(--border-color);
        }

        .ai-chatbot.minimized {
          height: 60px;
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          background: var(--navbar-bg);
          border-radius: 16px 16px 0 0;
        }

        .chat-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chat-icon {
          width: 32px;
          height: 32px;
          color: var(--primary-color);
        }

        .chat-title h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .chat-title p {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .chat-controls {
          display: flex;
          gap: 0.5rem;
        }

        .minimize-btn,
        .close-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: var(--hover-bg);
          color: var(--text-secondary);
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .minimize-btn:hover,
        .close-btn:hover {
          background: var(--danger-color);
          color: white;
        }

        .control-icon {
          width: 16px;
          height: 16px;
        }

        .chat-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message {
          display: flex;
          margin-bottom: 0.5rem;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message.bot {
          justify-content: flex-start;
        }

        .message-content {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          position: relative;
        }

        .message.user .message-content {
          background: var(--primary-color);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.bot .message-content {
          background: var(--hover-bg);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }

        .message-content p {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .message-time {
          font-size: 0.75rem;
          opacity: 0.7;
          margin-top: 0.25rem;
          display: block;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-secondary);
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .chat-input {
          display: flex;
          padding: 1rem;
          border-top: 1px solid var(--border-color);
          gap: 0.75rem;
        }

        .message-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 24px;
          background: var(--input-bg);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .message-input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .send-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: var(--primary-color);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .send-btn:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-1px);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .send-icon {
          width: 18px;
          height: 18px;
        }

        @media (max-width: 480px) {
          .ai-chatbot {
            width: calc(100vw - 40px);
            right: 20px;
            left: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default AIChatbot;
