/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    mode: "light",
    // 基础颜色
    text: "#000000",
    background: "#ffffff",
    foreground: "#000000",

    // 卡片和弹出层
    card: "#ffffff",
    cardForeground: "#000000",
    popover: "#ffffff",
    popoverForeground: "#000000",

    // 主要颜色
    primary: "#000000",
    primaryForeground: "#ffffff",
    tint: "#000000",

    // 次要颜色
    secondary: "#f8f9fa",
    secondaryForeground: "#000000",

    // 静音和强调色
    muted: "#f1f3f4",
    mutedForeground: "#5f6368",
    accent: "#f8f9fa",
    accentForeground: "#000000",

    // 状态颜色
    destructive: "#ea4335",
    destructiveForeground: "#ffffff",
    success: "#34a853",
    successForeground: "#ffffff",
    warning: "#fbbc04",
    warningForeground: "#000000",
    error: "#ea4335", // 别名

    // 边框和输入
    border: "#e8eaed",
    input: "transparent",
    inputBackground: "#f8f9fa",

    // 开关和其他组件
    switchBackground: "#dadce0",
    ring: "#000000",

    // 图标颜色（保持原有的兼容性）
    icon: "#5f6368",
    tabIconDefault: "#5f6368",
    tabIconSelected: "#000000",
  },
  dark: {
    mode: "dark",
    // 基础颜色
    text: "#ffffff",
    background: "#121212",
    foreground: "#ffffff",

    // 卡片和弹出层
    card: "#1e1e1e",
    cardForeground: "#ffffff",
    popover: "#1e1e1e",
    popoverForeground: "#ffffff",

    // 主要颜色
    primary: "#ffffff",
    primaryForeground: "#000000",
    tint: "#ffffff",

    // 次要颜色
    secondary: "#2d2d2d",
    secondaryForeground: "#ffffff",

    // 静音和强调色
    muted: "#2d2d2d",
    mutedForeground: "#9aa0a6",
    accent: "#2d2d2d",
    accentForeground: "#ffffff",

    // 状态颜色
    destructive: "#f28b82",
    destructiveForeground: "#000000",
    success: "#81c995",
    successForeground: "#000000",
    warning: "#fdd663",
    warningForeground: "#000000",
    error: "#f28b82", // 别名

    // 边框和输入
    border: "#3c4043",
    input: "#2d2d2d",
    inputBackground: "#2d2d2d",

    // 开关和其他组件
    switchBackground: "#5f6368",
    ring: "#ffffff",

    // 图标颜色（保持原有的兼容性）
    icon: "#9aa0a6",
    tabIconDefault: "#9aa0a6",
    tabIconSelected: "#ffffff",
  },
};
