import React, { ReactNode, createContext, useCallback, useContext, useState, useEffect } from 'react';
import { MessageConfig, MessageContextType, MessageItem } from './types';
import { message } from '@/utils/message';

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const open = useCallback((config: MessageConfig) => {
    const id = `message_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const duration = config.duration ?? 3;
    const newMessage: MessageItem = {
      ...config,
      id,
      timestamp: Date.now(),
      duration,
    };

    setMessages(prev => [...prev, newMessage]);

    if (duration > 0) {
      setTimeout(() => {
        close(id);
      }, duration * 1000);
    }
  }, []);

  const close = useCallback((id: string) => {
    setMessages(prev => {
      const message = prev.find(msg => msg.id === id);
      if (message?.onClose) {
        message.onClose();
      }
      return prev.filter(msg => msg.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    setMessages([]);
  }, []);

  // 初始化message实例
  useEffect(() => {
    message.setHandler({ open, close, clear });
  }, [open, close, clear]);

  const value: MessageContextType = {
    messages,
    open,
    close,
    clear,
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
};