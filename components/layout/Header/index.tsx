import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { logout } from "@/services/api/authService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface HeaderProps {
  notificationCount?: number;
  menuCount?: number;
}

const { width } = Dimensions.get("window");

export function Header({ notificationCount = 3, menuCount = 1 }: HeaderProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const menuItems = [
    {
      id: "profile",
      title: t("profile"),
      description: t("profileDescription"),
      icon: "person-outline" as keyof typeof Ionicons.glyphMap,
      router: "/profile",
    },
    {
      id: "settings",
      title: t("settings"),
      description: t("settingsDescription"),
      icon: "settings-outline" as keyof typeof Ionicons.glyphMap,
      router: "/settings",
      hasNotification: true,
    },
    {
      id: "help",
      title: t("help"),
      description: t("helpDescription"),
      icon: "help-circle-outline" as keyof typeof Ionicons.glyphMap,
      router: "/help",
    },
    {
      id: "historyOrder",
      title: t("historyOrder"),
      description: t("historyOrderDescription"),
      icon: "help-circle-outline" as keyof typeof Ionicons.glyphMap,
      router: "/history",
    },
    {
      id: "logout",
      title: t("signOut"),
      description: t("signOutDescription"),
      icon: "log-out-outline" as keyof typeof Ionicons.glyphMap,
      action: () => {
        onSignOut?.();
      },
      variant: "destructive" as const,
    },
  ];
  const handlePress = (item: any) => {
    if (item.action) {
      item.action();
    }
    if (item.router) {
      router.push(item.router);
    }
    setIsMenuOpen(false);
  };
  const onNotificationsClick = () => {
    router.push("/notifications");
  };
  const onSignOut = async () => {
    try {
      const res: any = await logout();
      console.log('res',res)
      debugger
      if (res?.code === 200) {
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error removing auth status:", error);
      router.replace("/login");
    }
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Logo/Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>NEO</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            {/* Notifications */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onNotificationsClick}
            >
              <Ionicons name="notifications-outline" size={20} color={"#fff"} />
              {notificationCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Menu Toggle */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Ionicons
                name={isMenuOpen ? "close" : "menu"}
                size={20}
                color={"#fff"}
              />
              {menuCount > 0 && !isMenuOpen && (
                <View style={[styles.badge, styles.primaryBadge]}>
                  <Text style={styles.badgeText}>{menuCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={isMenuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setIsMenuOpen(false)}
        >
          {/* Menu Panel */}
          <View
            style={[styles.menuPanel, { backgroundColor: theme.background }]}
          >
            <TouchableOpacity activeOpacity={1}>
              {/* User Info */}
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Ionicons
                    name="person"
                    size={20}
                    color={theme.mutedForeground}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>Restaurant Owner</Text>
                  <Text style={styles.userEmail}>owner@restaurant.com</Text>
                </View>
              </View>

              {/* Menu Items */}
              <View style={styles.menuItems}>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handlePress(item)}
                    style={[
                      styles.menuItem,
                      item.variant === "destructive" &&
                        styles.destructiveMenuItem,
                    ]}
                  >
                    <View style={styles.menuItemIcon}>
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={
                          item.variant === "destructive"
                            ? theme.destructive
                            : theme.text
                        }
                      />
                      {item.hasNotification && (
                        <View style={styles.notificationDot} />
                      )}
                    </View>
                    <View style={styles.menuItemContent}>
                      <Text
                        style={[
                          styles.menuItemTitle,
                          item.variant === "destructive" &&
                            styles.destructiveText,
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text style={styles.menuItemDescription}>
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      backgroundColor: "#000",
      borderBottomWidth: 1,
      borderBottomColor: "#3c4043",
      paddingTop: 30, // Account for status bar
    },
    headerContent: {
      backgroundColor: "#000",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      height: 64,
    },
    titleContainer: {
      backgroundColor: "#000",
    },
    title: {
      fontSize: 18,
      fontWeight: "500",
      color: "#ffffff",
    },
    actions: {
      backgroundColor: "#000",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    actionButton: {
      position: "relative",
      padding: 8,
      borderRadius: 8,
    },
    badge: {
      position: "absolute",
      top: -4,
      right: -4,
      width: 20,
      height: 20,
      backgroundColor: theme.destructive,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    primaryBadge: {
      backgroundColor: theme.primary,
    },
    badgeText: {
      color: theme.primaryForeground,
      fontSize: 10,
      fontWeight: "500",
    },
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      paddingTop: 104, // Header height + status bar
      paddingRight: 16,
    },
    menuPanel: {
      width: Math.min(288, width - 32),
      borderRadius: 8,
      shadowColor: theme.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    userInfo: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    userAvatar: {
      width: 40,
      height: 40,
      backgroundColor: theme.muted,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
    },
    userEmail: {
      fontSize: 14,
      color: theme.mutedForeground,
    },
    menuItems: {
      padding: 8,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 8,
    },
    destructiveMenuItem: {
      // Additional styling for destructive items can be added here
    },
    menuItemIcon: {
      position: "relative",
      marginRight: 12,
    },
    notificationDot: {
      position: "absolute",
      top: -2,
      right: -2,
      width: 8,
      height: 8,
      backgroundColor: theme.destructive,
      borderRadius: 4,
    },
    menuItemContent: {
      flex: 1,
    },
    menuItemTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
    },
    destructiveText: {
      color: theme.destructive,
    },
    menuItemDescription: {
      fontSize: 12,
      color: theme.mutedForeground,
      marginTop: 2,
    },
  });
