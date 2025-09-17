import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

// 创建动态样式函数
export const createStyles = (theme: any) => {

  
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      zIndex: 9999,
      pointerEvents: 'box-none',
      transform: [{ translateY: -50 }],
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageItem: {
      backgroundColor: theme.card,
      borderRadius: 8,
      borderLeftWidth: 4,
      marginBottom: 8,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: theme.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      minWidth: 200, // 最小宽度
      maxWidth: width - 32, // 最大宽度，确保不超出屏幕
      alignSelf: 'center', // 自身居中
      borderColor: theme.border,
    },
    messageContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    messageIcon: {
      marginRight: 8,
    },
    messageText: {
      fontSize: 14,
      lineHeight: 20,
      flexShrink: 1, // 允许文本收缩
      color: theme.text,
    },
    closeButton: {
      padding: 4,
      marginLeft: 8,
    },
  });
};