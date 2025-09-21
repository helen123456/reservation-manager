// contexts/AuthContext.tsx
import storage from '@/utils/storage';
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

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
      const token = await storage.getItem('token');
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
  }, []);
  
  const onLogout = useCallback(async () => {
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