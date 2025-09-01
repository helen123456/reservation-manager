import { FieldValues } from 'react-hook-form';
import { BaseInput } from './BaseInput';
import { FormInput } from './FormInput';
import { StandaloneInput } from './StandaloneInput';
import {
  FormInputProps,
  InputProps,
  StandaloneInputProps,
} from './types';

// 类型守卫函数
function isFormInput<T extends FieldValues>(
  props: InputProps<T>
): props is FormInputProps<T> {
  return  'name' in props;
}

// 主要的 Input 组件
function Input<T extends FieldValues = any>(props: InputProps<T>) {
  if (isFormInput(props)) {
    return <FormInput {...props} />;
  }
  return <StandaloneInput {...props} />;
}

export default Input;
export { BaseInput, FormInput, StandaloneInput };
export type { FormInputProps, InputProps, StandaloneInputProps };
