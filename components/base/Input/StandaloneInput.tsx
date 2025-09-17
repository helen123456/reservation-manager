import React, { useCallback, useState } from 'react';
import { z } from 'zod';
import { BaseInput } from './BaseInput';
import { StandaloneInputProps } from './types';

// 独立 Input 组件
export function StandaloneInput({
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