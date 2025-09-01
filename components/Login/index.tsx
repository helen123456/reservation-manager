import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";
import { useTranslation } from "../../hooks/useTranslation";
import { styles } from "./styles";
import { LoginProps, registerSchema } from "./types";

export default function Login({ onLogin }: LoginProps) {
  const { t } = useTranslation();
  type RegisterFormData = z.infer<typeof registerSchema>;

  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // 实时验证
  });
  const {
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = methods;

  //提交
  const onSubmit = async (data: RegisterFormData) => {
    console.log("data", data);
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

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
                inputMode='email'
                name="email"
                label={t("loginEmail")}
                placeholder={t("emailPlaceholder")}
                leftIcon="mail-outline"
                required
                helperText="用户名将作为您的登录凭证"
              />
              <Input
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
                  (isSubmitting || !isValid) && styles.disabledButton,
                ]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
