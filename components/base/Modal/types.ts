export interface ModalProps {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  cancelText?: string;
  sureText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  showCancel?: boolean;
  showOk?: boolean;
  footer?: boolean;
  cancelButtonColor?: string;
  okButtonColor?: string;
  cancelTextColor?: string;
  okTextColor?: string;
  onBackdropPress?: () => void;
}