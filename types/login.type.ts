import { z } from "zod";
import { TranslationKey } from "../utils/i18n";

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

// 创建动态schema函数，接收翻译函数作为参数
export const getRegisterSchema = (t: (key: TranslationKey) => string) => {
  return z.object({
    email: z.string().email(t("emailRequired")),
    password: z
      .string()
      .min(6, t("passwordMinLength"))
      .max(20, t("passwordMaxLength"))
      .regex(/[a-zA-Z]/, t("passwordMustContainLetter"))
      .regex(/[0-9]/, t("passwordMustContainNumber"))
      .regex(/[!@#$%^&*(),.?":{}|<>]/, t("passwordMustContainSpecialChar")),
  });
};

// 注意：现在需要传入翻译函数参数
// export const registerSchema = getRegisterSchema(t);

// 忘记密码表单验证规则
export const getForgotPasswordSchema = (t: (key: TranslationKey) => string) => {
  return z.object({
    email: z.string().email(t("emailRequired")),
  });
};

// 注意：现在需要传入翻译函数参数
// export const forgotPasswordSchema = getForgotPasswordSchema(t);

// 重置密码表单验证规则
export const getResetPasswordSchema = (t: (key: TranslationKey) => string) => {
  const passwordMismatchMessage = t("passwordMismatch");
  return z.object({
    email: z.string().email(t("emailRequired")),
    newPassword: z
      .string()
      .min(6, t("passwordMinLength"))
      .max(20, t("passwordMaxLength"))
      .regex(/[a-zA-Z]/, t("passwordMustContainLetter"))
      .regex(/[0-9]/, t("passwordMustContainNumber"))
      .regex(/[!@#$%^&*(),.?":{}|<>]/, t("passwordMustContainSpecialChar")),
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: passwordMismatchMessage,
    path: ["confirmPassword"],
  });
};

// 注意：现在需要传入翻译函数参数
// export const resetPasswordSchema = getResetPasswordSchema(t);

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordState {
  step: 'email' | 'verification' | 'reset';
  email: string;
  isLoading: boolean;
  countdown: number;
}