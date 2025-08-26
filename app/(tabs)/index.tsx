
import Header from "@/components/Header";
import HelpSupport from "@/components/HelpSupport";
import NotificationsPage from "@/components/NotificationsPage";
import ProfileDetail from "@/components/ProfileDetail";
import ReservationModule from "@/components/ReservationModule";
import SettingsModule from "@/components/SettingsModule";
import TableSettingsDetail from "@/components/TableSettingsDetail";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

// Cross-platform storage utility
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      try {
        return typeof window !== "undefined"
          ? window.localStorage.getItem(key)
          : null;
      } catch {
        return null;
      }
    }
    return AsyncStorage.getItem(key);
  },

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, value);
        }
      } catch {
        // Ignore storage errors on web
      }
      return;
    }
    return AsyncStorage.setItem(key, value);
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      try {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(key);
        }
      } catch {
        // Ignore storage errors on web
      }
      return;
    }
    return AsyncStorage.removeItem(key);
  },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("reservations");
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

        // Check authentication status
        const authStatus = await storage.getItem("isAuthenticated");
        const isAuth = authStatus === "true";
        setIsAuthenticated(isAuth);

        // If not authenticated, redirect to login page
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
      if (currentSettingsSection === "table-settings") {
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
    <View style={styles.container}>
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
          {renderContent()}
        {/* </ParallaxScrollView> */}
      
    </View>
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
