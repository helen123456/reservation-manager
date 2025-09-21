import { Input } from "@/components";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAsyncDebounce } from "@/hooks/useDebounce";
import { useTranslation } from "@/hooks/useTranslation";
import { login } from "@/services/api/authService";
import createStyles from "@/styles/login.style";
import { getRegisterSchema } from "@/types/login.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

export default function Login() {
   const { onLogin } = useAuth();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const registerSchema = useMemo(() => getRegisterSchema(t), [t]);
  type RegisterFormData = z.infer<typeof registerSchema>;

  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "fefe@11.com",
      password: "fwef@1111",
    },
    mode: "onChange", // 实时验证
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  // 带防抖的登录提交函数
  const onSubmit = useAsyncDebounce(async (data: RegisterFormData) => {
    await login(data).then(async () => {
      await onLogin();
      router.push("/reservation");
    });
  }, 300);

  //忘记密码
  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t("signIn")}</Text>
            <Text style={styles.subtitle}>{t("signInDescription")}</Text>
          </View>

          {/* Login Form */}
          <FormProvider {...methods}>
            <View style={styles.form}>
              {/* Email Field */}
              <Input
                labelStyle={{ color: theme.primary }}
                inputMode="email"
                name="email"
                label={t("loginEmail")}
                placeholder={t("emailPlaceholder")}
                leftIcon="mail-outline"
                required
              />
              <Input
                labelStyle={{ color: theme.primary }}
                keyboardType="email-address"
                name="password"
                label={t("password")}
                placeholder={t("passwordPlaceholder")}
                leftIcon="lock-closed-outline"
                required
              />

              {/* Forgot Password */}
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    {t("forgotPassword")}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                style={[
                  styles.signInButton,
                  (isSubmitting || !isValid) && styles.disabledButton,
                ]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.signInButtonText}>{t("signIn")}</Text>
                )}
              </TouchableOpacity>
            </View>
          </FormProvider>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
