import { Header, Toast } from "@/components";
import { useTheme } from "@/hooks/ThemeContext";
import HelpSupport from "@/page/HelpSupport";
import HistoryOrder from "@/page/HistoryOrder";
import NotificationsPage from "@/page/NotificationsModule";
import ProfileDetail from "@/page/ProfileModule";
import ReservationModule from "@/page/ReservationModule";
import SettingsModule from "@/page/SettingsModule";
import TableSettingsDetail from "@/page/TableSettingsDetail";
import { logout } from "@/services/api/authService";
import storage from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<
    "main" | "settings" | "profile" | "help" | "notifications"|"history"
  >("main");
  const [currentSettingsSection, setCurrentSettingsSection] = useState<
    string | null
  >(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [exitApp, setExitApp] = useState(false);
  const backPressCount = React.useRef(0);
  const backPressTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load fonts and check authentication status on app load
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
        });
        setFontsLoaded(true);
        const token = await storage.getItem("token");
        const isAuth = Boolean(token);
        setIsAuthenticated(isAuth);
        if (!isAuth) {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        // Still set fonts loaded to true to prevent infinite loading
        setFontsLoaded(true);
        // Redirect to login on error
        router.replace("/login");
      }
    };
    initializeApp();
  }, []);

  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      // If we're in a settings section, go back to settings
      if (currentSettingsSection) {
        setCurrentSettingsSection(null);
        return true;
      }
      
      // If we're not on main view, go back to main
      if (currentView !== "main") {
        setCurrentView("main");
        setCurrentSettingsSection(null);
        return true;
      }
      
      // If we're on main view, handle back press within time window to exit
      if (backPressCount.current === 0) {
        backPressCount.current = 1;
        setExitApp(true);
        
        // Show toast message
        Toast.info('再按一次退出应用', {
          position: 'bottom',
          duration: 2
        });
        
        // Reset after 2 seconds
        backPressTimer.current = setTimeout(() => {
          backPressCount.current = 0;
          setExitApp(false);
        }, 2000);
        
        return true; // Prevent default back action
      } else if (backPressCount.current === 1) {
        // Second press within 2 seconds, exit app
        if (backPressTimer.current) {
          clearTimeout(backPressTimer.current);
        }
        backPressCount.current = 0;
        setExitApp(false);
        BackHandler.exitApp(); // Exit the app
        return true;
      }
      
      // Default case - should not reach here, but prevent default action
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
      if (backPressTimer.current) {
        clearTimeout(backPressTimer.current);
      }
    };
  }, [currentView, currentSettingsSection]);

  const handleSettingsClick = () => {
    setCurrentView("settings");
    setCurrentSettingsSection(null);
  };

  const handleProfileClick = () => {
    setCurrentView("profile");
    setCurrentSettingsSection(null);
  };

  const handleNotificationsClick = () => {
    setCurrentView("notifications");
    setCurrentSettingsSection(null);
  };

  const handleHelpClick = () => {
    setCurrentView("help");
    setCurrentSettingsSection(null);
  };
  const handleHistoryClick=()=>{
    setCurrentView("history");
     setCurrentSettingsSection(null);
  }

  const handleSignOut = async () => {
    try {
      const res: any = await logout();
      if (res.code === 200) {
        setCurrentView("main");
        setCurrentSettingsSection(null);
        // Redirect to login page after sign out
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error removing auth status:", error);
      // Still redirect to login on error
      router.replace("/login");
    }
  };

  const handleBackToMain = () => {
    setCurrentView("main");
    setCurrentSettingsSection(null);
  };

  const handleSettingsNavigation = (section: string) => {
    setCurrentSettingsSection(section);
  };

  const handleBackToSettings = () => {
    setCurrentSettingsSection(null);
  };
  

  const renderContent = () => {
    if (currentView === "settings") {
      if (currentSettingsSection === "business-hours") {
        return <TableSettingsDetail onBack={handleBackToSettings} />;
      }
      return (
        <SettingsModule
          onNavigate={handleSettingsNavigation}
          onBack={handleBackToMain}
        />
      );
    }

    if (currentView === "profile") {
      return <ProfileDetail onBack={handleBackToMain} />;
    }

    if (currentView === "help") {
      return <HelpSupport onBack={handleBackToMain} />;
    }

    if (currentView === "notifications") {
      return <NotificationsPage onBack={handleBackToMain} />;
    }
    if (currentView === "history") {
      return <HistoryOrder onBack={handleBackToMain} />;
    }
    return <ReservationModule />;
  };

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If not authenticated, the useEffect will handle redirect to login
  if (!isAuthenticated) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Redirecting to login...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container,{backgroundColor:theme.background}]}>
      {/* Header */}
      <Header
        onSettingsClick={handleSettingsClick}
        onNotificationsClick={handleNotificationsClick}
        onProfileClick={handleProfileClick}
        onHelpClick={handleHelpClick}
        onSignOut={handleSignOut}
        onHistoryClick={handleHistoryClick}
      />

      {/* Main Content */}

      {/* <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        > */}
      <SafeAreaView edges={["bottom"]} style={{ flex: 1}}>
        {renderContent()}
      </SafeAreaView>
      {/* </ParallaxScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Roboto_400Regular'
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
  withBottomNav: {
    paddingBottom: 80,
  },
});
