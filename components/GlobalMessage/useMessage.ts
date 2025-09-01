import { useMessageContext } from './MessageContext';
import { MessageConfig } from './types';

export const useMessage = () => {
  const { open, close, clear } = useMessageContext();

  const message = {
    open: (config: MessageConfig) => open(config),
    success: (content: string, duration?: number, onClose?: () => void) => 
      open({ type: 'success', content, duration, onClose }),
    error: (content: string, duration?: number, onClose?: () => void) => 
      open({ type: 'error', content, duration, onClose }),
    warning: (content: string, duration?: number, onClose?: () => void) => 
      open({ type: 'warning', content, duration, onClose }),
    info: (content: string, duration?: number, onClose?: () => void) => 
      open({ type: 'info', content, duration, onClose }),
    close,
    clear,
  };

  return message;
};