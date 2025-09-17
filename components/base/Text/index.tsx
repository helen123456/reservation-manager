import React from 'react';
import { Platform, Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

export interface TextProps extends RNTextProps {
  children: React.ReactNode;
  variant?: 'body' | 'caption' | 'heading' | 'subheading';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  style,
  variant = 'body',
  weight = 'normal',
  color,
  ...props
}) => {
  const textStyle = [
    styles.base,
    styles[variant],
    styles[weight],
    color && { color },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: Platform.select({
      ios: 'System', // iOS 系统默认字体
      android: 'Roboto_400Regular', // Android 系统默认字体
      default: 'System',
    }),
    color: '#000000',
  },
  // 字体大小变体
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
  },
  subheading: {
    fontSize: 18,
    lineHeight: 28,
  },
  // 字体粗细
  normal: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});

export default Text;
export { Text };
