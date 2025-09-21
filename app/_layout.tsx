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
    if (isLogged) {
      if (inAuthGroup) {
        router.replace("/reservation");
      }
    } else {
      if (!inAuthGroup) {
        router.replace("/login");
      }
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

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="help/index"
        options={{ headerShown: true, header: () => <Header /> }}
      />
      <Stack.Screen
        name="history/index"
        options={{ headerShown: true, header: () => <Header /> }}
      />
      <Stack.Screen
        name="profile/index"
        options={{ headerShown: true, header: () => <Header /> }}
      />
      <Stack.Screen
        name="settings/index"
        options={{ headerShown: true, header: () => <Header /> }}
      />
      <Stack.Screen
        name="reserveTimeSetting/index"
        options={{ headerShown: true, header: () => <Header /> }}
      />
      <Stack.Screen
        name="notifications/index"
        options={{ headerShown: true, header: () => <Header /> }}
      />
    </Stack>
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
    <AuthProvider>
      <ThemeProvider>
        <Provider>
          <AppContent />
          <StatusBar style="auto" />
        </Provider>
      </ThemeProvider>
    </AuthProvider>
  );
}
