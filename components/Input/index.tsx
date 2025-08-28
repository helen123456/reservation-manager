import Icon from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { forwardRef, useCallback, useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';
import { styles } from './styles';
import {
  FormInputProps,
  InputProps,
  StandaloneInputProps,
} from './types';

// 类型守卫函数
function isFormInput<T extends FieldValues>(
  props: InputProps<T>
): props is FormInputProps<T> {
  return 'control' in props && 'name' in props;
}

// 表单 Input 组件
function FormInput<T extends FieldValues>({
  control,
  name,
  rules,
  zodSchema,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        // validate: (value, formValues) => {
        //   // 首先执行自定义验证规则
        //   if (rules?.validate) {
        //     // 正确处理 validate 的不同类型
        //     if (typeof rules.validate === 'function') {
        //       const customResult = rules.validate(value, formValues);
        //       if (customResult !== true && customResult !== undefined) {
        //         return customResult;
        //       }
        //     } else if (typeof rules.validate === 'object') {
        //       // 处理多个验证函数的情况
        //       for (const [key, validateFn] of Object.entries(rules.validate)) {
        //         if (typeof validateFn === 'function') {
        //           const result = validateFn(value, formValues);
        //           if (result !== true && result !== undefined) {
        //             return result;
        //           }
        //         }
        //       }
        //     }
        //   }
          
        //   // 然后执行 Zod 验证
        //   if (zodSchema) {
        //     try {
        //       zodSchema.parse(value);
        //       return true;
        //     } catch (error) {
        //       if (error instanceof z.ZodError) {
        //         return error.issues[0]?.message || '验证失败';
        //       }
        //       return '验证失败';
        //     }
        //   }
          
        //   return true;
        // },
      }}
      render={({ field, fieldState }) => (
        <BaseInput
          {...inputProps}
          value={field.value || ''}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

// 独立 Input 组件
function StandaloneInput({
  value = '',
  onChangeText,
  error: externalError,
  zodSchema,
  ...inputProps
}: StandaloneInputProps) {
  const [internalError, setInternalError] = useState<string>();
  
  const handleTextChange = useCallback((text: string) => {
    onChangeText?.(text);
    
    // Zod 实时验证
    if (zodSchema) {
      try {
        zodSchema.parse(text);
        setInternalError(undefined);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setInternalError(error.issues[0]?.message || '验证失败');
        }
      }
    }
  }, [onChangeText, zodSchema]);
  
  return (
    <BaseInput
      {...inputProps}
      value={value}
      onChangeText={handleTextChange}
      error={externalError || internalError}
    />
  );
}

// 基础 Input 组件
interface BaseInputInternalProps {
  value: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  iconColor?: string;
  iconSize?: number;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  containerStyle?: any;
  inputStyle?: any;
  labelStyle?: any;
  errorStyle?: any;
  helperStyle?: any;
  onClear?: () => void;
  onIconPress?: () => void;
  [key: string]: any;
}

const BaseInput = forwardRef<TextInput, BaseInputInternalProps>(
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
    const [focused, setFocused] = useState(false);
    
    const handleClear = useCallback(() => {
      onChangeText?.('');
      onClear?.();
    }, [onChangeText, onClear]);
    
    // const handleFocus = useCallback(() => {
    //   setFocused(true);
    // }, []);
     const handleFocus = () => {
      // setFocused(true);
    };
    
    const handleBlur = useCallback(() => {
      setFocused(false);
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

// 主要的 Input 组件
function Input<T extends FieldValues = any>(props: InputProps<T>) {
  if (isFormInput(props)) {
    return <FormInput {...props} />;
  }
  return <StandaloneInput {...props} />;
}

export default Input;
export { FormInput, StandaloneInput };
export type { FormInputProps, InputProps, StandaloneInputProps };

