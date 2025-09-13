import Header from "@/components/Header";
import HelpSupport from "@/components/HelpSupport";
import NotificationsPage from "@/components/NotificationsPage";
import ProfileDetail from "@/components/ProfileDetail";
import ReservationModule from "@/components/ReservationModule";
import SettingsModule from "@/components/SettingsModule";
import TableSettingsDetail from "@/components/TableSettingsDetail";
import { ThemedView } from "@/components/ThemedView";
import storage from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<
    "main" | "settings" | "profile" | "help" | "notifications"
  >("main");
  const [currentSettingsSection, setCurrentSettingsSection] = useState<
    string | null
  >(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  const handleSignOut = async () => {
    try {
      setIsAuthenticated(false);
      await storage.removeItem("isAuthenticated");
      setCurrentView("main");
      setCurrentSettingsSection(null);
      // Redirect to login page after sign out
      router.replace("/login");
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
    <ThemedView style={styles.container}>
      {/* Header */}
      <Header
        onSettingsClick={handleSettingsClick}
        onNotificationsClick={handleNotificationsClick}
        onProfileClick={handleProfileClick}
        onHelpClick={handleHelpClick}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}

      {/* <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        > */}
      <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
        {renderContent()}
      </SafeAreaView>
      {/* </ParallaxScrollView> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
