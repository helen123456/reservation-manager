import storage from "@/utils/storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
const colorSchemes = { light: Colors.light, dark: Colors.dark };

// 2. 创建 Context
const ThemeContext = createContext();

// 3. 创建 ThemeProvider 组件
export const ThemeProvider = ({ children }) => {
  // 获取系统的颜色方案 ('light' | 'dark')
  // const systemColorScheme = useColorScheme();
  const systemColorScheme = 'light';
  // 状态管理当前主题，默认使用系统主题
  const [theme, setTheme] = useState(colorSchemes[systemColorScheme]);
  // 状态标记用户是否主动选择过主题
  const [userChosenTheme, setUserChosenTheme] = useState(false);

  // 4. 初始化时从本地存储读取保存的主题
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedThemeName = await storage.getItem("userTheme");
        if (savedThemeName && colorSchemes[savedThemeName]) {
          setTheme(colorSchemes[savedThemeName]);
          setUserChosenTheme(true); // 用户曾选择过主题
        } else {
          // 如果没有保存的主题，则使用系统主题
          setTheme(colorSchemes[systemColorScheme]);
        }
      } catch (error) {
        console.error("Failed to load theme", error);
      }
    };
    loadSavedTheme();
  }, [systemColorScheme]);

  // 5. 监听系统主题变化（如果用户没有手动选择过主题）
  useEffect(() => {
    debugger;
    if (!userChosenTheme) {
      setTheme(colorSchemes[systemColorScheme]);
    }
  }, [systemColorScheme, userChosenTheme]);

  // 6. 切换主题的函数
  const toggleTheme = async (newThemeName) => {
    if (colorSchemes[newThemeName]) {
      setTheme(colorSchemes[newThemeName]);
      setUserChosenTheme(true); // 用户主动选择了主题
      try {
        // 保存用户选择
        await storage.setItem("userTheme", newThemeName);
      } catch (error) {
        console.error("Failed to save theme", error);
      }
    }
  };

  // 通过 Context 提供 theme 和 toggleTheme
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 7. 创建一个方便使用的自定义 Hook
export const useTheme = () => useContext(ThemeContext);

// 默认导出 Context
export default ThemeContext;
