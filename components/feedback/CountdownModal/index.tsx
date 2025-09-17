import { useTheme } from '@/hooks/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

interface CountdownModalProps {
  visible: boolean;
  message: string;
  initialCount?: number;
  onComplete?: () => void;
}

export const CountdownModal: React.FC<CountdownModalProps> = ({
  visible,
  message,
  initialCount = 5,
  onComplete
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(initialCount);

  useEffect(() => {
    if (!visible) {
      setCountdown(initialCount);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onComplete) {
            onComplete();
          } else {
            router.push('/login');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible, initialCount, onComplete]);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      padding: 24,
      marginHorizontal: 32,
      minWidth: 280,
      alignItems: 'center',
    },
    message: {
      fontSize: 16,
      color: theme.background,
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 24,
    },
    countdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    countdownText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.background,
      marginHorizontal: 4,
    },
    secondsText: {
      fontSize: 16,
      color: theme.background,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>{countdown}</Text>
            <Text style={styles.secondsText}>{t('seconds')}后自动跳转登录页</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CountdownModal;