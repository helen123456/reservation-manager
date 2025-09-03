import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

// 主题类型定义
export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof Colors.light;

// 主题上下文类型
interface ThemeContextType {
  colorScheme: ColorScheme;
  colors: ThemeColors;
  isDark: boolean;
}



// 使用主题的 hook
export function useTheme(): ThemeContextType {
   const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';

  const theme: ThemeContextType = {
    colorScheme,
    colors,
    isDark,
  };
  return theme;
}

// 获取当前颜色的 hook
export function useColors() {
  const { colors } = useTheme();
  return colors;
}

// 创建主题样式的 hook
export function useThemedStyles<T>(createStyles: (colors: ThemeColors) => T) {
  const colors = useColors();
  return createStyles(colors);
}

