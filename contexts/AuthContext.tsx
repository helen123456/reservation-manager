// contexts/AuthContext.tsx
import { migrateInsecureAuthStorage } from "@/services/api/authService";
import { pushNotificationService } from "@/services/pushNotificationService";
import secureStorage from "@/utils/secureStorage";
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

// 定义 Context 中值的类型
interface AuthContextType {
  isLogged: boolean | null;
  isLoading: boolean;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLogged: null,
  isLoading: true,
  onLogin: async () => {},
  onLogout: async () => {},
});

export const useAuth = () => useContext(AuthContext);
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检查登录状态的函数
  const checkLoginStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      // 启动时先迁移旧版本可能落盘的明文凭据，再读取 token。
      await migrateInsecureAuthStorage();
      const token = await secureStorage.getItem("token");
      setIsLogged(!!token);
    } catch (error) {
      setIsLogged(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const onLogin = useCallback(async () => {
    setIsLogged(true);

    // 登录成功后重新注册推送令牌
    // try {
    //   await pushNotificationService.reregisterPushToken();
    //   console.log('登录后推送令牌重新注册成功');
    // } catch (error) {
    //   console.error('登录后推送令牌重新注册失败:', error);
    // }
  }, []);

  const onLogout = useCallback(async () => {
    // Unregister this device's push token so the user does not keep receiving
    // notifications after sign-out (also frees the (userId, deviceId) row).
    try {
      await pushNotificationService.unregister();
    } catch (error) {
      console.warn("unregister push token on logout failed:", error);
    }
    setIsLogged(false);
  }, []);

  const value = {
    isLogged,
    isLoading,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
