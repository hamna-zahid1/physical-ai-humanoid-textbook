import React, { useState } from 'react';

// Color palette matching the textbook design
const colors = {
  accent: '#B87333', // Warmer copper tone
  darkBg: '#0A0A0A',
  cardBg: '#141414',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#2A2A2A',
  gradientStart: '#141414',
  gradientEnd: '#0A0A0A'
};

// Typography styles matching the textbook
const typography = {
  heading: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 600,
    letterSpacing: '-0.02em'
  },
  body: {
    fontFamily: '"Georgia", serif',
    fontWeight: 400,
    lineHeight: 1.6
  },
  subheading: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
    letterSpacing: '-0.01em'
  }
};

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

    const userMessage = { text: inputValue, sender: 'user' } as const;
    setMessages(prev => [...prev, userMessage]);
    const question = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
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
        const text = await response.text();
        console.log('Raw response:', text);
        const jsonStr = text.replace(/^data:\s*/m, '').trim();
        console.log('Parsed JSON string:', jsonStr);
        const data = JSON.parse(jsonStr);
        console.log('Data object:', data);
        const botText = data.response || data.answer || 'No response received';
        const botMessage = { text: botText, sender: 'bot' } as const;
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
      {/* Floating chat button - Minimalist design */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: isOpen ? '340px' : '24px',
          width: '56px',
          height: '56px',
          borderRadius: '16px', // Square with slight rounding for modern look
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}DD)`,
          color: colors.darkBg,
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 8px 20px ${colors.accent}40`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
          ...typography.heading
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = isOpen ? 'scale(0.95)' : 'scale(1.05)';
          e.currentTarget.style.boxShadow = `0 12px 24px ${colors.accent}60`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
          e.currentTarget.style.boxShadow = `0 8px 20px ${colors.accent}40`;
        }}
      >
        <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>◈</span>
      </button>

      {/* Chat panel - Matching textbook card design */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '320px',
            height: '480px',
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Header - Clean minimalist design */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.cardBg}, ${colors.darkBg})`,
              borderBottom: `1px solid ${colors.border}`,
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}10)`,
                border: `1px solid ${colors.accent}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.accent,
                fontSize: '14px',
                ...typography.heading
              }}>
                AI
              </div>
              <div>
                <span style={{
                  ...typography.heading,
                  color: colors.text,
                  fontSize: '16px',
                  display: 'block',
                  marginBottom: '2px'
                }}>
                  AI Assistant
                </span>
                <span style={{
                  ...typography.body,
                  color: colors.textSecondary,
                  fontSize: '12px'
                }}>
                  Physical AI Expert
                </span>
              </div>
            </div>
            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: `1px solid ${colors.border}`,
                color: colors.textSecondary,
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                ...typography.subheading
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.color = colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.color = colors.textSecondary;
              }}
            >
              ×
            </button>
          </div>

          {/* Messages container - Clean, minimal scrollbar */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              backgroundColor: colors.darkBg,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              scrollbarWidth: 'thin',
              scrollbarColor: `${colors.border} ${colors.darkBg}`,
            }}
          >
            {messages.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: colors.textSecondary,
                ...typography.body,
                fontSize: '14px',
                border: `1px dashed ${colors.border}`,
                borderRadius: '12px',
                backgroundColor: colors.cardBg + '40'
              }}>
                Ask me anything about Physical AI and robotics
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                <div style={{
                  backgroundColor: message.sender === 'user' ? colors.accent : colors.cardBg,
                  color: message.sender === 'user' ? colors.darkBg : colors.text,
                  padding: '12px 16px',
                  borderRadius: message.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  border: message.sender === 'user' ? 'none' : `1px solid ${colors.border}`,
                  ...typography.body,
                  fontSize: '14px',
                  lineHeight: '1.6',
                  wordBreak: 'break-word',
                  boxShadow: message.sender === 'user' 
                    ? `0 4px 12px ${colors.accent}30`
                    : 'none'
                }}>
                  {message.text}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: colors.textSecondary,
                  marginTop: '4px',
                  marginLeft: message.sender === 'user' ? 'auto' : '8px',
                  marginRight: message.sender === 'user' ? '8px' : 'auto',
                  width: 'fit-content',
                  ...typography.body
                }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  maxWidth: '85%',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                <div style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  ...typography.body,
                  fontSize: '14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: colors.accent,
                        animation: 'bounce 1.4s infinite ease-in-out',
                        transform: 'scale(0.8)',
                      }} />
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: colors.accent,
                        animation: 'bounce 1.4s infinite ease-in-out',
                        animationDelay: '0.2s',
                        transform: 'scale(0.8)',
                      }} />
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: colors.accent,
                        animation: 'bounce 1.4s infinite ease-in-out',
                        animationDelay: '0.4s',
                        transform: 'scale(0.8)',
                      }} />
                    </div>
                    <span style={{ color: colors.textSecondary }}>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area - Clean design matching textbook buttons */}
          <div
            style={{
              padding: '16px',
              backgroundColor: colors.cardBg,
              borderTop: `1px solid ${colors.border}`,
              display: 'flex',
              gap: '8px',
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
                padding: '12px 16px',
                borderRadius: '30px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.darkBg,
                color: colors.text,
                outline: 'none',
                ...typography.body,
                fontSize: '14px',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.accent}20`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              style={{
                padding: '12px 24px',
                backgroundColor: isLoading || !inputValue.trim() ? colors.border : colors.accent,
                color: isLoading || !inputValue.trim() ? colors.textSecondary : colors.darkBg,
                border: 'none',
                borderRadius: '30px',
                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                ...typography.subheading,
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                opacity: isLoading || !inputValue.trim() ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isLoading && inputValue.trim()) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${colors.accent}40`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap');
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0.6);
            opacity: 0.6;
          }
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        
        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: ${colors.darkBg};
        }
        
        div::-webkit-scrollbar-thumb {
          background: ${colors.border};
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: ${colors.accent}60;
        }
      `}</style>
    </>
  );
};

export default ChatBot;