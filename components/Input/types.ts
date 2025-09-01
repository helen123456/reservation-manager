import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { InputModeOptions, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { z } from "zod";

// 基础 Input 组件属性接口
export interface BaseInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  placeholder?: string;
  helperText?: string;
  inputMode?: InputModeOptions;
  leftIcon?: string;
  rightIcon?: string;
  iconColor?: string;
  iconSize?: number;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  helperStyle?: TextStyle;
  onClear?: () => void;
  onIconPress?: () => void;
  onBlur?: () => void;
}

// 表单 Input 属性接口（泛型）
export interface FormInputProps<T extends FieldValues> extends BaseInputProps {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
  zodSchema?: z.ZodSchema;
}

// 独立 Input 属性接口
export interface StandaloneInputProps extends BaseInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  zodSchema?: z.ZodSchema;
}

// 联合类型
export type InputProps<T extends FieldValues = any> =
  | FormInputProps<T>
  | StandaloneInputProps;

// 登录表单 schema
export const loginSchema = z.object({
  email: z.string().email("请输入正确的邮箱"),
  password: z.string().min(6, "密码至少 6 位"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

// 用户注册表单 schema 示例
export const registerSchema = z
  .object({
    username: z.string().min(2, "用户名至少2位").max(20, "用户名最多20位"),
    email: z.string().email("请输入有效的邮箱地址"),
    password: z.string().min(6, "密码至少6位"),
    confirmPassword: z.string(),
    phone: z.string().regex(/^1[3-9]\d{9}$/, "请输入有效的手机号"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密码不匹配",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
