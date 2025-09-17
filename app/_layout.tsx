import { GlobalMessage, MessageProvider } from "@/components/feedback/GlobalMessage";
import { ThemeProvider } from "@/hooks/ThemeContext";
import { Provider } from '@ant-design/react-native';
import { OpenSans_400Regular, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";



export default function RootLayout() {
 
  const [fontsLoaded] = useFonts({
     antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    'Roboto_400Regular': Roboto_400Regular,
    'Roboto_500Medium': Roboto_500Medium,
    'OpenSans_400Regular': OpenSans_400Regular,
    'OpenSans_600SemiBold': OpenSans_600SemiBold,
  });


  if (!fontsLoaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
   
    <ThemeProvider>
      <Provider>
      <MessageProvider>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
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
