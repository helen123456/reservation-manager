import { Input } from "@/components";
import { useTheme } from "@/hooks/ThemeContext";
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
  ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { z } from "zod";
import { useAsyncDebounce } from "../hooks/useDebounce";
import { useTranslation } from "../hooks/useTranslation";

export default function Login() {
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
    const res = await login(data);

    if (res.code === 200) {
      router.push("/(tabs)");
    }
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
            <Text style={styles.subtitle}>
              {t("signInDescription")}
            </Text>
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
                helperText="用户名将作为您的登录凭证"
              />
              <Input
                labelStyle={{ color: theme.primary }}
                keyboardType="email-address"
                name="password"
                label={t("password")}
                placeholder={t("passwordPlaceholder")}
                leftIcon="lock-closed-outline"
                required
                helperText="用户名将作为您的登录凭证"
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
                  <Text style={styles.signInButtonText}>
                    {t("signIn")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </FormProvider>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
