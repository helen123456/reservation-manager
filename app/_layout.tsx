import { Header } from "@/components";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Provider } from "@ant-design/react-native";
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

function AppContent() {
  // 获取认证状态和方法
  const { isLogged, isLoading } = useAuth();
  console.log("isLoading", isLoading);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";
    
    console.log('路由保护检查:', { isLogged, segments, inAuthGroup, inTabsGroup });
    
    // 保护需要登录的路由
    if (!isLogged && !inAuthGroup) {
      console.log('未登录用户访问受保护路由，重定向到登录页');
      router.replace("/(auth)/login");
    }
  }, [isLogged, isLoading, segments]); // 当这些依赖变化时，重新执行

  // 显示加载指示器
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 检查是否在auth页面
  const inAuthGroup = segments[0] === "(auth)";

  return (
    <View style={{ flex: 1 }}>
      {/* 全局Header，只在非auth页面显示 */}
      {!inAuthGroup && <Header />}
      
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="help/index" />
        <Stack.Screen name="history/index" />
        <Stack.Screen name="profile/index" />
        <Stack.Screen name="settings/index" />
        <Stack.Screen name="reserveTimeSetting/index" />
        <Stack.Screen name="notifications/index" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
    Roboto_400Regular: Roboto_400Regular,
    Roboto_500Medium: Roboto_500Medium,
    OpenSans_400Regular: OpenSans_400Regular,
    OpenSans_600SemiBold: OpenSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <Provider>
            <AppContent />
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />
          </Provider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
