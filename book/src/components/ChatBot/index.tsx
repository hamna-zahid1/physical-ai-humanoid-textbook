import React, { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, sender: 'user' } as const;
    setMessages(prev => [...prev, userMessage]);
    const question = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Send POST request to the backend
      const response = await fetch('https://hamnazahid-physical-ai-backend.hf.space/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          context: '',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = { text: data.response || data.answer || 'No response received', sender: 'bot' } as const;
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage = { text: 'Error: Could not get response from server', sender: 'bot' } as const;
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Error: Network issue occurred', sender: 'bot' } as const;
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: isOpen ? '320px' : '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#00d4ff',
          color: '#0a0a0a',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: '1000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'right 0.3s ease',
        }}
      >
        🤖
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: '#0a0a0a',
            border: '1px solid #00d4ff',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            zIndex: '1000',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#00d4ff',
              color: '#0a0a0a',
              padding: '12px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>AI Assistant</span>
            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: '#0a0a0a',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '0',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>

          {/* Messages container */}
          <div
            style={{
              flex: 1,
              padding: '12px',
              overflowY: 'auto',
              backgroundColor: '#1a1a1a',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: message.sender === 'user' ? '#00d4ff' : '#2a2a2a',
                  color: message.sender === 'user' ? '#0a0a0a' : '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  margin: '4px 0',
                  maxWidth: '80%',
                }}
              >
                {message.text}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#2a2a2a',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  margin: '4px 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#00d4ff',
                      marginRight: '8px',
                      animation: 'bounce 1.5s infinite',
                    }}
                  />
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div
            style={{
              padding: '12px',
              backgroundColor: '#1a1a1a',
              borderTop: '1px solid #333',
              display: 'flex',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #00d4ff',
                backgroundColor: '#0a0a0a',
                color: '#ffffff',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              style={{
                marginLeft: '8px',
                padding: '8px 16px',
                backgroundColor: '#00d4ff',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Loading animation style */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scale(0.8); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default ChatBot;