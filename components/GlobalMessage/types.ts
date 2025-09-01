export type MessageType = 'success' | 'error' | 'warning' | 'info';

export interface MessageConfig {
  type: MessageType;
  content: string;
  duration?: number; // 持续时间（秒），默认 3 秒
  onClose?: () => void;
}

export interface MessageItem extends MessageConfig {
  id: string;
  timestamp: number;
}

export interface MessageContextType {
  messages: MessageItem[];
  open: (config: MessageConfig) => void;
  close: (id: string) => void;
  clear: () => void;
}