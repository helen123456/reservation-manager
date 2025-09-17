import { CountdownModal, Input, Text, Toast } from "@/components";
import { useTheme } from "@/hooks/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import {
  resetPwd,
  sendResetPwdEmail,
  verifyResetPwdCode,
} from "@/services/api/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import createStyles from "../styles/forgotPassword.style";
import {
  ForgotPasswordForm,
  ResetPasswordForm,
  getForgotPasswordSchema,
  getResetPasswordSchema,
} from "../types/login.type";

type Step = "email" | "verification" | "reset" | "success";
const COUNT_DOWN = 10;

const ForgotPasswordScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const forgotPasswordSchema = useMemo(() => getForgotPasswordSchema(t), [t]);
  const resetPasswordSchema = useMemo(() => getResetPasswordSchema(t), [t]);

  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showCountdownModal, setShowCountdownModal] = useState(false);
   

  // Email form
  const emailForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  // Reset password form
  const resetForm = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // Countdown timer for resend code
  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Send verification code
  const handleSendCode = async (data: ForgotPasswordForm) => {
    setIsLoading(true);

    try {
      await sendResetPwdEmail({ email: data.email });
      setEmail(data.email);
      setCurrentStep("verification");
      setCountdown(COUNT_DOWN); // 60 seconds countdown

      Toast.info( `${t("sendVerificationCode")} ${data.email}`);
    } catch (error) {
      Toast.fail(t("emailNotFound"));
    } finally {
      setIsLoading(false);
    }
  };

  // Verify code
  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      Toast.info(t("invalidCode"));
      return;
    }
    setIsLoading(true);
    try {
      console.log("Verifying code:", verificationCode);
      await verifyResetPwdCode({ email, code: verificationCode });

      setCurrentStep("reset");
    } catch (error) {
      Toast.fail(t("invalidCode"));
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async (data: ResetPasswordForm) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to reset password
      console.log("Resetting password for:", email);

      // Simulate API call
      await resetPwd({ email, pwd: data.newPassword });

      // setCurrentStep("success");
      // 显示倒计时弹窗
      setShowCountdownModal(true);
    } catch (error) {
      Toast.fail(t("passwordResetFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    try {
      // TODO: Implement API call to resend code
      console.log("Resending code to:", email);

      // Simulate API call
      await sendResetPwdEmail({ email });

      setCountdown(COUNT_DOWN);
      Toast.info(`${t("sendVerificationCode")} ${email}`);
    } catch (error) {
      Toast.fail(t("emailNotFound"));
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate back to login
  const handleBackToLogin = () => {
    router.replace("/login");
  };

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = ["email", "verification", "reset"];
    const currentIndex = steps.indexOf(currentStep);

    return (
      <View style={styles.stepIndicatorContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <View
              style={[
                styles.stepIndicator,
                index <= currentIndex && { backgroundColor: theme.primary },
              ]}
            >
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.stepLine,
                  index < currentIndex && { backgroundColor: theme.primary },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  // Render email step
  const renderEmailStep = () => (
    <FormProvider {...emailForm}>
      <View style={styles.form}>
        <Text style={styles.subtitle}>{t("forgotPasswordSubtitle")}</Text>

        <Input
          name="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          inputMode="email"
          leftIcon="mail-outline"
          required
        />

        <TouchableOpacity
          style={[
            styles.signInButton,
            (isLoading || !emailForm.formState.isValid) &&
              styles.disabledButton,
          ]}
          onPress={emailForm.handleSubmit(handleSendCode)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.signInButtonText}>
              {t("sendVerificationCode")}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={handleBackToLogin}
        >
          <Text style={styles.forgotPasswordText}>{t("backToSignIn")}</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );

  // Render verification step
  const renderVerificationStep = () => (
    <View style={styles.form}>
      <Text style={styles.subtitle}>
        {t("verificationCodeSubtitle")} {email}
      </Text>

      <Input
        placeholder={t("enterVerificationCode")}
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
        maxLength={6}
        inputStyle={{ textAlign: "center" }}
      />

      <TouchableOpacity
        style={[
          styles.signInButton,
          (isLoading || verificationCode.length !== 6) && styles.disabledButton,
        ]}
        onPress={handleVerifyCode}
        disabled={isLoading || verificationCode.length !== 6}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.signInButtonText}>{t("verifyCode")}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={handleResendCode}
        disabled={countdown > 0 || isLoading}
      >
        <Text style={styles.forgotPasswordText}>
          {countdown > 0
            ? `${t("resendCodeIn")} ${countdown} ${t("seconds")}`
            : t("resendCode")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Render reset password step
  const renderResetStep = () => (
    <FormProvider {...resetForm}>
      <View style={styles.form}>
        <Text style={styles.subtitle}>{t("resetPasswordSubtitle")}</Text>

        <Input
          name="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          leftIcon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />

        <Input
          name="newPassword"
          label={t("newPassword")}
          placeholder={t("passwordPlaceholder")}
          leftIcon="lock-closed-outline"
          secureTextEntry
          required
        />

        <Input
          name="confirmPassword"
          label={t("confirmNewPassword")}
          placeholder={t("passwordPlaceholder")}
          leftIcon="lock-closed-outline"
          secureTextEntry
          required
        />

        <TouchableOpacity
          style={[
            styles.signInButton,
            (isLoading || !resetForm.formState.isValid) &&
              styles.disabledButton,
          ]}
          onPress={resetForm.handleSubmit(handleResetPassword)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.signInButtonText}>{t("resetPassword")}</Text>
          )}
        </TouchableOpacity>
      </View>
    </FormProvider>
  );

  // Render success step
  const renderSuccessStep = () => (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text style={[styles.title, { textAlign: "center", marginBottom: 10 }]}>
        {t("passwordResetSuccess")}
      </Text>
      <Text
        style={[styles.subtitle, { textAlign: "center", marginBottom: 30 }]}
      >
        {t("passwordResetSuccessMessage")}
      </Text>

      <TouchableOpacity style={styles.signInButton} onPress={handleBackToLogin}>
        <Text style={styles.signInButtonText}>{t("backToSignIn")}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "email":
        return renderEmailStep();
      case "verification":
        return renderVerificationStep();
      case "reset":
        return renderResetStep();
      case "success":
        return renderSuccessStep();
      default:
        return renderEmailStep();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{t("resetPasswordTitle")}</Text>
          </View>
          {currentStep !== "success" && renderStepIndicator()}
          {renderCurrentStep()}
        </ScrollView>
      </KeyboardAvoidingView>
      
      <CountdownModal
         visible={showCountdownModal}
         message={t("passwordResetSuccessMessage")}
         initialCount={5}
         onComplete={() => {
           setShowCountdownModal(false);
           router.push("/login");
         }}
       />
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
