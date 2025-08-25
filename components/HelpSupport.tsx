import React from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

interface HelpSupportProps {
  onBack: () => void;
}

export default function HelpSupport({ onBack }: HelpSupportProps) {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>{t('helpSupport')}</ThemedText>
      </ThemedView>

      <ScrollView style={styles.content}>
        <ThemedText style={styles.description}>
          {t('helpSupportDescription')}
        </ThemedText>

        <ThemedView style={styles.helpItem}>
          <Ionicons name="chatbubbles-outline" size={24} color="#3b82f6" />
          <ThemedView style={styles.helpContent}>
            <ThemedText style={styles.helpTitle}>{t('liveChat')}</ThemedText>
            <ThemedText style={styles.helpSubtitle}>{t('liveChatDescription')}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.helpItem}>
          <Ionicons name="help-circle-outline" size={24} color="#3b82f6" />
          <ThemedView style={styles.helpContent}>
            <ThemedText style={styles.helpTitle}>{t('frequentlyAskedQuestions')}</ThemedText>
            <ThemedText style={styles.helpSubtitle}>Find answers to common questions</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.helpItem}>
          <Ionicons name="mail-outline" size={24} color="#3b82f6" />
          <ThemedView style={styles.helpContent}>
            <ThemedText style={styles.helpTitle}>{t('emailSupport')}</ThemedText>
            <ThemedText style={styles.helpSubtitle}>Send us an email for assistance</ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 12,
  },
  helpContent: {
    flex: 1,
    marginLeft: 12,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  helpSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
});
