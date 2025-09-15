import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "../hooks/useTranslation";

interface HeaderProps {
  onSettingsClick: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onHelpClick?: () => void;
  onSignOut?: () => void;
  onHistoryClick?: () => void;
  notificationCount?: number;
  menuCount?: number;
}

const { width } = Dimensions.get('window');

export default function Header({ 
  onSettingsClick, 
  onNotificationsClick, 
  onProfileClick, 
  onHelpClick, 
  onSignOut, 
  onHistoryClick,
  notificationCount = 3, 
  menuCount = 1 
}: HeaderProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      id: 'profile',
      title: t('profile'),
      description: 'Manage your profile and preferences',
      icon: 'person-outline' as keyof typeof Ionicons.glyphMap,
      action: () => {
        onProfileClick?.();
        setIsMenuOpen(false);
      }
    },
    {
      id: 'settings',
      title: t('settings'),
      description: 'Manage your restaurant settings',
      icon: 'settings-outline' as keyof typeof Ionicons.glyphMap,
      action: () => {
        onSettingsClick();
        setIsMenuOpen(false);
      },
      hasNotification: true
    },
    {
      id: 'help',
      title: t('help'),
      description: 'Get help and contact support',
      icon: 'help-circle-outline' as keyof typeof Ionicons.glyphMap,
      action: () => {
        onHelpClick?.();
        setIsMenuOpen(false);
      }
    },
     {
      id: 'historyOrder',
      title: t('historyOrder'),
      description: 'historyOrder',
      icon: 'help-circle-outline' as keyof typeof Ionicons.glyphMap,
      action: () => {
        onHistoryClick?.();
        setIsMenuOpen(false);
      }
    },
    {
      id: 'logout',
      title: t('signOut'),
      description: t('signOutDescription'),
      icon: 'log-out-outline' as keyof typeof Ionicons.glyphMap,
      action: () => {
        onSignOut?.();
        setIsMenuOpen(false);
      },
      variant: 'destructive' as const
    }
  ];

  return (
    <>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerContent}>
          {/* Logo/Title */}
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.title}>NEO</ThemedText>
          </ThemedView>

          {/* Actions */}
          <ThemedView style={styles.actions}>
            {/* Notifications */}
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={onNotificationsClick}
            >
              <Ionicons name="notifications-outline" size={20} color="white" />
              {notificationCount > 0 && (
                <ThemedView style={styles.badge}>
                  <ThemedText style={styles.badgeText}>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </ThemedText>
                </ThemedView>
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
                color="white" 
              />
              {menuCount > 0 && !isMenuOpen && (
                <ThemedView style={[styles.badge, styles.primaryBadge]}>
                  <ThemedText style={styles.badgeText}>{menuCount}</ThemedText>
                </ThemedView>
              )}
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>

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
          <ThemedView style={styles.menuPanel}>
            <TouchableOpacity activeOpacity={1}>
              {/* User Info */}
              <ThemedView style={styles.userInfo}>
                <ThemedView style={styles.userAvatar}>
                  <Ionicons name="person" size={20} color="#666" />
                </ThemedView>
                <ThemedView style={styles.userDetails}>
                  <ThemedText style={styles.userName}>Restaurant Owner</ThemedText>
                  <ThemedText style={styles.userEmail}>owner@restaurant.com</ThemedText>
                </ThemedView>
              </ThemedView>

              {/* Menu Items */}
              <ThemedView style={styles.menuItems}>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={item.action}
                    style={[
                      styles.menuItem,
                      item.variant === 'destructive' && styles.destructiveMenuItem
                    ]}
                  >
                    <ThemedView style={styles.menuItemIcon}>
                      <Ionicons 
                        name={item.icon} 
                        size={20} 
                        color={item.variant === 'destructive' ? '#ef4444' : '#333'} 
                      />
                      {item.hasNotification && (
                        <ThemedView style={styles.notificationDot} />
                      )}
                    </ThemedView>
                    <ThemedView style={styles.menuItemContent}>
                      <ThemedText style={[
                        styles.menuItemTitle,
                        item.variant === 'destructive' && styles.destructiveText
                      ]}>
                        {item.title}
                      </ThemedText>
                      <ThemedText style={styles.menuItemDescription}>
                        {item.description}
                      </ThemedText>
                    </ThemedView>
                  </TouchableOpacity>
                ))}
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    paddingTop: 30, // Account for status bar
  },
  headerContent: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
  },
  titleContainer:{
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  actions: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBadge: {
    backgroundColor: '#3b82f6',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 104, // Header height + status bar
    paddingRight: 16,
  },
  menuPanel: {
    width: Math.min(288, width - 32),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  userAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuItems: {
    padding: 8,
   
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  destructiveMenuItem: {
    // Additional styling for destructive items can be added here
  },
  menuItemIcon: {
    position: 'relative',
    marginRight: 12,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  destructiveText: {
    color: '#ef4444',
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});
