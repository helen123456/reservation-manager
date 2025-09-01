import { z } from "zod";
export interface LoginProps {
  onLogin: () => void;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginState {
  showPassword: boolean;
  loginForm: LoginForm;
  isLoading: boolean;
}
export  const registerSchema = z.object({
    email: z.string().email("请输入正确的邮箱"),
    password: z
      .string()
      .min(6, "密码不能少于6位")
      .max(20, "密码不能超过20位")
      .regex(/[a-zA-Z]/, "密码必须包含字母")
      .regex(/[0-9]/, "密码必须包含数字")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "密码必须包含特殊字符"),
  });