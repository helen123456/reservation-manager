import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { z } from 'zod';
import Input from './index';

// 定义完整的用户注册表单 Schema
const registerSchema = z.object({
  // 基础信息
  username: z
    .string()
    .min(2, '用户名至少2位')
    .max(20, '用户名最多20位')
    .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, '用户名只能包含字母、数字、下划线和中文'),
  
  email: z
    .string()
    .email({ message: '请输入有效的邮箱地址' })
    .min(1, '邮箱不能为空'),
  
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码'),
  
  // 密码相关
  password: z
    .string()
    .min(8, '密码至少8位')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '密码必须包含大小写字母和数字'),
  
  confirmPassword: z.string(),
  
  // 个人信息
  realName: z
    .string()
    .min(2, '真实姓名至少2位')
    .max(10, '真实姓名最多10位'),
  
  // 修复：保持 age 为字符串类型，在验证时进行数字检查
  age: z
    .string()
    .regex(/^\d+$/, '年龄必须是数字')
    .refine(val => {
      const num = parseInt(val, 10);
      return num >= 18 && num <= 100;
    }, '年龄必须在18-100之间'),
  
  bio: z
    .string()
    .max(200, '个人简介最多200字')
    .optional(),
  
  // 地址信息
  address: z
    .string()
    .min(5, '地址至少5个字符')
    .optional(),
  
  // 验证码
  verificationCode: z
    .string()
    .length(6, '验证码必须是6位数字')
    .regex(/^\d{6}$/, '验证码只能是数字'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function FormExample() {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      realName: '',
      age: '',
      bio: '',
      address: '',
      verificationCode: '',
    },
    mode: 'onChange', // 实时验证
  });

  const { handleSubmit, watch, setValue, formState: { errors, isValid, isSubmitting } } = methods;

  // 监听手机号变化，用于发送验证码
  const phoneValue = watch('phone');

  const onSubmit = async (data: RegisterFormData) => {
    debugger
    try {
      Alert.alert(
        '注册成功',
        `欢迎 ${data.realName}！您的账号 ${data.username} 已成功注册。`,
        [
          {
            text: '确定',
            onPress: () => {
              // 重置表单
              methods.reset();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('注册失败', '请检查网络连接后重试');
    }
  };

  const sendVerificationCode = () => {
    if (!phoneValue || !/^1[3-9]\d{9}$/.test(phoneValue)) {
      Alert.alert('提示', '请先输入正确的手机号码');
      return;
    }
    
    Alert.alert('验证码已发送', `验证码已发送到 ${phoneValue}`);
  };

  const generateRandomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setValue('verificationCode', code);
    Alert.alert('提示', `已自动填入验证码: ${code}`);
  };

  return (
    <SafeAreaView style={styles.container}>
     
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
         
        <FormProvider {...methods}>
          <View style={styles.header}>
            <Text style={styles.title}>用户注册</Text>
            <Text style={styles.subtitle}>请填写以下信息完成注册</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>账号信息</Text>
            
            {/* 用户名 */}
            <Input
              control={methods.control}
              name="username"
              label="用户名"
              placeholder="请输入用户名"
              leftIcon="person"
              
              required
              helperText="用户名将作为您的登录凭证"
            />

            {/* 邮箱 */}
            <Input
              control={methods.control}
              name="email"
              label="邮箱地址"
              placeholder="请输入邮箱地址"
              leftIcon="email"
              
              required
              keyboardType="email-address"
              autoCapitalize="none"
              helperText="用于接收重要通知和找回密码"
            />

            {/* 手机号 */}
            <View style={styles.phoneContainer}>
              <View style={styles.phoneInput}>
                <Input
                  control={methods.control}
                  name="phone"
                  label="手机号码"
                  placeholder="请输入手机号码"
                  leftIcon="phone"
                  
                  required
                  keyboardType="phone-pad"
                  maxLength={11}
                />
              </View>
              <TouchableOpacity 
                style={styles.codeButton}
                onPress={sendVerificationCode}
              >
                <Text style={styles.codeButtonText}>发送验证码</Text>
              </TouchableOpacity>
            </View>

            {/* 验证码 */}
            <View style={styles.phoneContainer}>
              <View style={styles.phoneInput}>
                <Input
                  control={methods.control}
                  name="verificationCode"
                  label="验证码"
                  placeholder="请输入6位验证码"
                  leftIcon="security"
                  required
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
              <TouchableOpacity 
                style={styles.codeButton}
                onPress={generateRandomCode}
              >
                <Text style={styles.codeButtonText}>模拟获取</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>密码设置</Text>
            
            {/* 密码 */}
            <Input
              control={methods.control}
              name="password"
              label="登录密码"
              placeholder="请输入密码"
              leftIcon="lock"
              required
              secureTextEntry
              helperText="密码必须包含大小写字母和数字，至少8位"
            />

            {/* 确认密码 */}
            <Input
              control={methods.control}
              name="confirmPassword"
              label="确认密码"
              placeholder="请再次输入密码"
              leftIcon="lock"
              required
              
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>个人信息</Text>
            
            {/* 真实姓名 */}
            <Input
              control={methods.control}
              name="realName"
              label="真实姓名"
              placeholder="请输入真实姓名"
              leftIcon="badge"
              
              required
            />

            {/* 年龄 */}
            <Input
              control={methods.control}
              name="age"
              label="年龄"
              placeholder="请输入年龄"
              leftIcon="cake"
              
              keyboardType="number-pad"
              maxLength={3}
            />

            {/* 个人简介 */}
            <Input
              control={methods.control}
              name="bio"
              label="个人简介"
              placeholder="请简单介绍一下自己（可选）"
              leftIcon="description"
              
              multiline
              numberOfLines={4}
              maxLength={200}
              textAlignVertical="top"
              helperText="最多200字"
            />

            {/* 地址 */}
            <Input
              control={methods.control}
              name="address"
              label="联系地址"
              placeholder="请输入详细地址（可选）"
              leftIcon="location-on"
              
              multiline
              numberOfLines={2}
            />
          </View>

          {/* 提交按钮 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!isValid || isSubmitting) && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
            >
              <Text style={[
                styles.submitButtonText,
                (!isValid || isSubmitting) && styles.submitButtonTextDisabled,
              ]}>
                {isSubmitting ? '注册中...' : '立即注册'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => methods.reset()}
            >
              <Text style={styles.resetButtonText}>重置表单</Text>
            </TouchableOpacity>
          </View>

          {/* 表单状态信息 */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              表单状态: {isValid ? '✅ 有效' : '❌ 无效'}
            </Text>
            {Object.keys(errors).length > 0 && (
              <Text style={styles.errorCount}>
                错误数量: {Object.keys(errors).length}
              </Text>
            )}
          </View>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  phoneInput: {
    flex: 1,
  },
  codeButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    minHeight: 48,
    justifyContent: 'center',
  },
  codeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  submitButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButtonTextDisabled: {
    color: '#9ca3af',
  },
  resetButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  resetButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
  statusContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  errorCount: {
    fontSize: 12,
    color: '#ef4444',
  },
});