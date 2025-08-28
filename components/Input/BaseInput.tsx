import Icon from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { forwardRef, useCallback } from 'react';
import {
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from './styles';

import { BaseInputProps } from './types';

export const BaseInput = forwardRef<TextInput, BaseInputProps>(
  ({
    value,
    onChangeText,
    onBlur,
    error,
    label,
    placeholder,
    helperText,
    leftIcon,
    rightIcon,
    iconColor = '#6b7280',
    iconSize = 20,
    clearable = false,
    disabled = false,
    required = false,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    helperStyle,
    onClear,
    onIconPress,
    ...textInputProps
  }, ref) => {
   
    
    const handleClear = useCallback(() => {
      onChangeText?.('');
      onClear?.();
    }, [onChangeText, onClear]);
    
    const handleFocus = () => {
      // setFocused(true);
    };
    
    const handleBlur = useCallback(() => {
    
      onBlur?.();
    }, [onBlur]);
    
    return (
      <View style={[styles.container, containerStyle]}>
        {/* 标签 */}
        {label && (
          <Text style={[styles.label, labelStyle]}>
            {label}{required && <Text style={styles.required}> *</Text>}
          </Text>
        )}
        
        {/* 输入框容器 */}
        <View
          style={[
            styles.inputContainer,
            error && styles.errorContainer,
            disabled && styles.disabledContainer,
          ]}
        >
          {/* 左侧图标 */}
          {leftIcon && (
            <Icon
              name={leftIcon as any}
              size={iconSize}
              color={iconColor}
              style={[styles.icon, styles.leftIcon]}
            />
          )}
          
          {/* 输入框 */}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              leftIcon && styles.inputWithLeftIcon,
              (rightIcon || clearable) && styles.inputWithRightIcon,
              Platform.OS === 'android' && styles.androidFix,
              inputStyle,
            ]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            editable={!disabled}
            cursorColor={"#6b7280"}
            {...textInputProps}
          />
          
          {/* 清除按钮 */}
          {clearable && value && !disabled && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Text><MaterialIcons name="clear" size={iconSize} color={iconColor} /></Text>
            </TouchableOpacity>
          )}
          
          {/* 右侧图标 */}
          {rightIcon && !clearable && (
            <TouchableOpacity
              onPress={onIconPress}
              style={[styles.icon, styles.rightIcon]}
            >
              <Icon
                name={rightIcon as any}
                size={iconSize}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
        </View>
        
        {/* 错误信息 */}
        {error && (
          <Text style={[styles.errorText, errorStyle]}>
            {error}
          </Text>
        )}
        
        {/* 辅助文本 */}
        {!error && helperText && (
          <Text style={[styles.helperText, helperStyle]}>
            {helperText}
          </Text>
        )}
      </View>
    );
  }
);

BaseInput.displayName = 'BaseInput';