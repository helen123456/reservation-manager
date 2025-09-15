import { GlobalMessage, MessageProvider } from "@/components/GlobalMessage";
import { ThemeProvider } from "@/hooks/ThemeContext";
import { Provider } from '@ant-design/react-native';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";




export default function RootLayout() {
 
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
  });


  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider>
      <Provider>
      <MessageProvider>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <GlobalMessage />
      </MessageProvider>
      </Provider>
    </ThemeProvider>
  );
}
