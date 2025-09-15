import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import { Text } from 'react-native';
import { useMessageContext } from './MessageContext';
import { createStyles } from './styles';
import { MessageType } from './types';

const getMessageIcon = (type: MessageType): keyof typeof MaterialIcons.glyphMap => {
  switch (type) {
    case 'success':
      return 'check-circle';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
};

const getMessageColor = (type: MessageType): string => {
  switch (type) {
    case 'success':
      return '#52c41a';
    case 'error':
      return '#ff4d4f';
    case 'warning':
      return '#faad14';
    case 'info':
      return '#1890ff';
    default:
      return '#1890ff';
  }
};

export const GlobalMessage: React.FC = () => {
  const { messages, close } = useMessageContext();
  const {theme} = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {messages.map((message) => {
        const iconName = getMessageIcon(message.type);
        const color = getMessageColor(message.type);
        
        return (
          <Animated.View
            key={message.id}
            style={[styles.messageItem, { borderLeftColor: color }]}
          >
            <View style={styles.messageContent}>
              <MaterialIcons 
                name={iconName} 
                size={20} 
                color={color} 
                style={styles.messageIcon}
              />
              <Text style={styles.messageText}>
                {message.content}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => close(message.id)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={16} color="#999" />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};