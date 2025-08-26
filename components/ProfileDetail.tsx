import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useTranslation } from '../hooks/useTranslation';
import { languages } from '../utils/i18n';

interface ProfileDetailProps {
  onBack: () => void;
}

export default function ProfileDetail({ onBack }: ProfileDetailProps) {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  
  const [profile, setProfile] = useState({
    restaurantName: 'Le Petit Bistro',
    ownerName: 'Marie Dubois',
    email: 'marie@lepetitbistro.com',
    phone: '+1 (555) 123-4567',
    address: '123 Rue de la Paix, Paris, France'
  });

  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleInputChange = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    Alert.alert('Success', t('profileUpdated'));
  };

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
    setShowLanguageSelector(false);
  };

  const getCurrentLanguageName = () => {
    const language = languages.find(lang => lang.code === currentLanguage);
    return language ? language.nativeName : 'English';
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    scrollContent: {
      padding: 16,
    },
    header: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      marginBottom: 16,
    },
    headerLeft: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    },
    backButton: {
      padding: 8,
      marginRight: 8,
      marginLeft: -8,
    },
    title: {
      fontSize: 18,
      fontWeight: '500' as const,
      color: '#111827',
    },
    saveButton: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      backgroundColor: '#111827',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500' as const,
      marginLeft: 4,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#d1d5db',
    },
    cardHeader: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: '#111827',
      marginLeft: 8,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: '#6b7280',
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: '#fff',
      color: '#111827',
    },
    inputFocused: {
      borderColor: '#3b82f6',
    },
    selectButton: {
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: '#fff',
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
    },
    selectButtonText: {
      fontSize: 16,
      color: '#111827',
    },
    languageModal: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    languageModalContent: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      margin: 20,
      maxHeight: 400,
    },
    languageModalTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: '#111827',
      marginBottom: 16,
      textAlign: 'center' as const,
    },
    languageOption: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
    },
    languageOptionSelected: {
      backgroundColor: '#f3f4f6',
    },
    languageOptionText: {
      fontSize: 16,
      color: '#111827',
    },
    languageOptionSubtext: {
      fontSize: 12,
      color: '#6b7280',
      marginTop: 2,
    },
    closeButton: {
      marginTop: 16,
      padding: 12,
      backgroundColor: '#f3f4f6',
      borderRadius: 6,
      alignItems: 'center' as const,
    },
    closeButtonText: {
      fontSize: 16,
      color: '#111827',
      fontWeight: '500' as const,
    },
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={onBack}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={20} color="#111827" />
            </TouchableOpacity>
            <ThemedText style={styles.title}>{t('profileTitle')}</ThemedText>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Feather name="save" size={14} color="#fff" />
            <Text style={styles.saveButtonText}>{t('save')}</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="user" size={18} color="#111827" />
            <ThemedText style={styles.cardTitle}>{t('personalInformation')}</ThemedText>
          </View>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{t('restaurantName')}</ThemedText>
            <TextInput 
              value={profile.restaurantName}
              onChangeText={(value) => handleInputChange('restaurantName', value)}
              style={styles.input}
              placeholder={t('restaurantName')}
              placeholderTextColor="#9ca3af"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{t('ownerName')}</ThemedText>
            <TextInput 
              value={profile.ownerName}
              onChangeText={(value) => handleInputChange('ownerName', value)}
              style={styles.input}
              placeholder={t('ownerName')}
              placeholderTextColor="#9ca3af"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{t('email')}</ThemedText>
            <TextInput 
              value={profile.email}
              onChangeText={(value) => handleInputChange('email', value)}
              style={styles.input}
              placeholder={t('email')}
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{t('phone')}</ThemedText>
            <TextInput 
              value={profile.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              style={styles.input}
              placeholder={t('phone')}
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{t('address')}</ThemedText>
            <TextInput 
              value={profile.address}
              onChangeText={(value) => handleInputChange('address', value)}
              style={styles.input}
              placeholder={t('address')}
              placeholderTextColor="#9ca3af"
              multiline
            />
          </View>
        </View>

        {/* Language Preferences */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="globe" size={18} color="#111827" />
            <ThemedText style={styles.cardTitle}>{t('preferences')}</ThemedText>
          </View>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{t('language')}</ThemedText>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => setShowLanguageSelector(true)}
            >
              <Text style={styles.selectButtonText}>{getCurrentLanguageName()}</Text>
              <Feather name="chevron-down" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <View style={styles.languageModal}>
          <View style={styles.languageModalContent}>
            <Text style={styles.languageModalTitle}>{t('language')}</Text>
            <ScrollView>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    currentLanguage === language.code && styles.languageOptionSelected
                  ]}
                  onPress={() => handleLanguageChange(language.code)}
                >
                  <Text style={styles.languageOptionText}>{language.nativeName}</Text>
                  <Text style={styles.languageOptionSubtext}>({language.name})</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowLanguageSelector(false)}
            >
              <Text style={styles.closeButtonText}>关闭</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ThemedView>
  );
}