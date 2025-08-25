import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useTranslation } from "../hooks/useTranslation";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setLoginForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      t('forgotPassword'),
      "Password reset functionality would be implemented here.",
      [{ text: "OK", style: "default" }]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Background overlay */}
        <ThemedView style={styles.overlay} />

        {/* Login Card */}
        <ThemedView>
          {/* Header */}
          <ThemedView style={styles.header}>
            <ThemedText style={styles.title}>{t('signIn')}</ThemedText>
            <ThemedText style={styles.subtitle}>
              {t('signInDescription')}
            </ThemedText>
          </ThemedView>

          {/* Login Form */}
          <ThemedView style={styles.form}>
            {/* Email Field */}
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>{t('loginEmail')}</ThemedText>
              <ThemedView style={styles.inputContainer}>
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color="#6b7280" 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder={t('emailPlaceholder')}
                  value={loginForm.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </ThemedView>
            </ThemedView>

            {/* Password Field */}
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>{t('password')}</ThemedText>
              <ThemedView style={styles.inputContainer}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color="#6b7280" 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder={t('passwordPlaceholder')}
                  value={loginForm.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>

            {/* Forgot Password */}
            <ThemedView style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={handleForgotPassword}>
                <ThemedText style={styles.forgotPasswordText}>
                  {t('forgotPassword')}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>

            {/* Sign In Button */}
            <TouchableOpacity
              style={[styles.signInButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <ThemedText style={styles.signInButtonText}>
                  {t('signIn')}
                </ThemedText>
              )}
            </TouchableOpacity>
          </ThemedView>

          {/* Divider */}
          <ThemedView style={styles.dividerContainer}>
            <ThemedView style={styles.divider} />
            <ThemedText style={styles.dividerText}>
              {t('orContinueWith')}
            </ThemedText>
            <ThemedView style={styles.divider} />
          </ThemedView>

          {/* Google Login */}
          <TouchableOpacity
            style={[styles.googleButton, isLoading && styles.disabledButton]}
            onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            <ThemedView style={styles.googleButtonContent}>
              <ThemedView style={styles.googleIcon}>
                <ThemedText style={styles.googleIconText}>G</ThemedText>
              </ThemedView>
              <ThemedText style={styles.googleButtonText}>
                {isLoading ? t('signingIn') : t('continueWithGoogle')}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>

          {/* Footer */}
          <ThemedView style={styles.footer}>
            <ThemedText style={styles.footerText}>
              {t('dontHaveAccount')}{' '}
              <ThemedText style={styles.signUpLink}>
                {t('signUp')}
              </ThemedText>
            </ThemedText>
          </ThemedView>

          {/* Demo Credentials */}
          <ThemedView style={styles.demoContainer}>
            <ThemedText style={styles.demoTitle}>
              {t('demoCredentials')}
            </ThemedText>
            <ThemedText style={styles.demoText}>
              <ThemedText style={styles.demoBold}>Email:</ThemedText> demo@restaurant.com
            </ThemedText>
            <ThemedText style={styles.demoText}>
              <ThemedText style={styles.demoBold}>Password:</ThemedText> password123
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    paddingLeft: 44,
    paddingRight: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  passwordInput: {
    paddingRight: 44,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#6b7280',
  },
  signInButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabledButton: {
    opacity: 0.6,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#6b7280',
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 24,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  googleIconText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  googleButtonText: {
    fontSize: 16,
    color: '#374151',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  signUpLink: {
    color: '#111827',
    fontWeight: '500',
  },
  demoContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  demoText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  demoBold: {
    fontWeight: 'bold',
  },
});
