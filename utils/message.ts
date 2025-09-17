import { MessageConfig } from '@/components/feedback/GlobalMessage/types';

// 全局message实例
class MessageInstance {
  private messageHandler: {
    open: (config: MessageConfig) => void;
    close: (id: string) => void;
    clear: () => void;
  } | null = null;

  setHandler(handler: {
    open: (config: MessageConfig) => void;
    close: (id: string) => void;
    clear: () => void;
  }) {
    this.messageHandler = handler;
  }

  open(config: MessageConfig) {
    if (this.messageHandler) {
      this.messageHandler.open(config);
    } else {
      console.warn('Message handler not initialized.');
    }
  }

  success(content: string, duration?: number, onClose?: () => void) {
    this.open({ type: 'success', content, duration, onClose });
  }

  error(content: string, duration?: number, onClose?: () => void) {
    this.open({ type: 'error', content, duration, onClose });
  }

  warning(content: string, duration?: number, onClose?: () => void) {
    this.open({ type: 'warning', content, duration, onClose });
  }

  info(content: string, duration?: number, onClose?: () => void) {
    this.open({ type: 'info', content, duration, onClose });
  }

  close(id: string) {
    if (this.messageHandler) {
      this.messageHandler.close(id);
    }
  }

  clear() {
    if (this.messageHandler) {
      this.messageHandler.clear();
    }
  }
}

// 导出单例实例
export const message = new MessageInstance();