import { Feather } from '@expo/vector-icons';
import { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import { createStyles } from './styles';
import { MessageProps } from './types';

export const Message: React.FC<MessageProps> = ({
  visible,
  title,
  message,
  type = 'info',
  autoClose = true,
  autoCloseDelay = 3,
  showFooter = false,
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
  onClose,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const autoCloseTimer = useRef<number | null>(null);
   const {theme} = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

  // 获取图标和颜色
  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'check-circle',
          color: '#10b981',
          backgroundColor: '#ecfdf5',
        };
      case 'error':
        return {
          icon: 'x-circle',
          color: '#ef4444',
          backgroundColor: '#fef2f2',
        };
      case 'warning':
        return {
          icon: 'alert-triangle',
          color: '#f59e0b',
          backgroundColor: '#fffbeb',
        };
      default:
        return {
          icon: 'info',
          color: '#3b82f6',
          backgroundColor: '#eff6ff',
        };
    }
  };

  const typeConfig = getTypeConfig();

  // 显示动画
  const showModal = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // 隐藏动画
  const hideModal = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  // 处理自动关闭
  useEffect(() => {
    if (visible) {
      showModal();
      
      // 如果不显示footer且开启自动关闭
      if (!showFooter && autoClose) {
        autoCloseTimer.current = setTimeout(() => {
          hideModal();
        }, autoCloseDelay * 1000);
      }
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }

    return () => {
      if (autoCloseTimer.current) {
        clearTimeout(autoCloseTimer.current);
      }
    };
  }, [visible, showFooter, autoClose, autoCloseDelay]);

  // 处理确定按钮
  const handleConfirm = () => {
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
    onConfirm?.();
    hideModal();
  };

  // 处理取消按钮
  const handleCancel = () => {
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
    onCancel?.();
    hideModal();
  };

  // 处理背景点击
  const handleBackdropPress = () => {
    if (!showFooter) {
      hideModal();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={handleBackdropPress}
      >
        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity activeOpacity={1}>
            {/* 图标区域 */}
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: typeConfig.backgroundColor },
              ]}
            >
              <Feather
                name={typeConfig.icon as any}
                size={24}
                color={typeConfig.color}
              />
            </View>

            {/* 内容区域 */}
            <View style={styles.content}>
              {title && (
                <Text style={styles.title}>{title}</Text>
              )}
              <Text style={styles.message}>{message}</Text>
            </View>

            {/* Footer按钮 */}
            {showFooter && (
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.confirmButton]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Message;