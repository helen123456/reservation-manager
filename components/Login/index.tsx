import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import { z } from "zod";
import { useAsyncDebounce } from "../../hooks/useDebounce";
import { useTranslation } from "../../hooks/useTranslation";
import { createStyles } from "./styles";
import { LoginProps, registerSchema } from "./types";
 type RegisterFormData = z.infer<typeof registerSchema>;


export default function Login({ onLogin }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const colorScheme = useColorScheme()??'light';
  const colors = Colors[colorScheme];
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);


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
 
  
  // 原始提交函数
  const submitLogin = useCallback(async (data: RegisterFormData) => {
    if (loading || isSubmitting) {
      return; // 如果正在提交，直接返回
    }
    setLoading(true);
    try {
      // await AuthService.login(data);
      onLogin();
    } catch (error) {
      console.log('error')
    } finally {
      setLoading(false);
    }
  }, [loading, isSubmitting, onLogin]);
  
  // 使用防抖 Hook
  const debouncedSubmit = useAsyncDebounce(submitLogin, 300);
  const onSubmit = useCallback((data: RegisterFormData) => {
    debouncedSubmit(data);
  }, [debouncedSubmit]);

  //忘记密码
  const handleForgotPassword = () => {
    Alert.alert(
      t("forgotPassword"),
      "Password reset functionality would be implemented here.",
      [{ text: "OK", style: "default" }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ThemedView style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <ThemedView style={styles.header}>
            <ThemedText style={styles.title}>{t("signIn")}</ThemedText>
            <ThemedText style={styles.subtitle}>
              {t("signInDescription")}
            </ThemedText>
          </ThemedView>

          {/* Login Form */}
          <FormProvider {...methods}>
            <ThemedView style={styles.form}>
              {/* Email Field */}
              <Input
                labelStyle={{color: colors.primary}}
                inputMode='email'
                name="email"
                label={t("loginEmail")}
                placeholder={t("emailPlaceholder")}
                leftIcon="mail-outline"
                required
                helperText="用户名将作为您的登录凭证"
              />
              <Input
               labelStyle={{color: colors.primary}}
                keyboardType="email-address"
                name="password"
                label={t("password")}
                placeholder={t("passwordPlaceholder")}
                leftIcon="lock-closed-outline"
                required
                helperText="用户名将作为您的登录凭证"
              />

              {/* Forgot Password */}
              <ThemedView style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <ThemedText style={styles.forgotPasswordText}>
                    {t("forgotPassword")}
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>

              {/* Sign In Button */}
              <TouchableOpacity
                style={[
                  styles.signInButton,
                  (isSubmitting || loading || !isValid) && styles.disabledButton,
                ]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting || loading}
              >
                {(isSubmitting || loading) ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <ThemedText style={styles.signInButtonText}>
                    {t("signIn")}
                  </ThemedText>
                )}
              </TouchableOpacity>
            </ThemedView>
          </FormProvider>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
