// src/components/ui/toast/index.ts
import { Toast as AntdToast } from '@ant-design/react-native';

export interface ToastOptions {
  duration?: number; // 显示时间
  mask?: boolean;    // 是否有蒙层
  position?: 'top' | 'bottom' | 'center'
  onClose?: () => void;
}
const styles={
  container: {
    marginHorizontal: 30,
    padding:20,
  },
  content:{
    fontSize:15,
  }
}

/**
 * 封装后的Toast
 * 用法：Toast.showSuccess('操作成功')
 */
const MyToast = {
  // 通用
  show: (content: string, options: ToastOptions = {}) => {
    AntdToast.show({
      content,
      duration: options.duration ?? 2,
      mask: options.mask ?? true,
      position: options.position ?? 'center',
      onClose: options.onClose,
      styles
    });
  },

  // 成功提示
  success: (content: string, options: ToastOptions = {}) => {
    AntdToast.success({
      content,
      duration: options.duration ?? 2,
      position: options.position ?? 'center',
      onClose: options.onClose,
      styles
    });
  },

  // 失败提示
  fail: (content: string, options: ToastOptions = {}) => {
    AntdToast.fail({
      content,
      duration: options.duration ?? 2,
      position: options.position ?? 'center',
      onClose: options.onClose,
      styles
    });
  },

  // 加载中
  loading: (content: string = '加载中...', options: ToastOptions = {}) => {
    AntdToast.loading({
      content,
      duration: options.duration ?? 0, // 默认不自动关闭
      mask: true,
      position: options.position ?? 'center',
      onClose: options.onClose,
      styles
    });
  },
  info: (content: string, options: ToastOptions = {}) => {
    AntdToast.info({
      content,
      duration: options.duration ?? 2,
      position: options.position ?? 'center',
      onClose: options.onClose,
      styles
    });
  },

  
};

export default MyToast;
