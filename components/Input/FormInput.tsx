import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { BaseInput } from './BaseInput';
import { FormInputProps } from './types';

// 表单 Input 组件
export function FormInput<T extends FieldValues>({
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
      rules={rules}
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