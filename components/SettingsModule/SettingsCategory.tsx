import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { ThemedText } from '../ThemedText';
import { createStyles } from './styles';
import { SettingsCategoryProps } from './types';

export default function SettingsCategory({ categories }: SettingsCategoryProps) {
  const colorScheme = useColorScheme()?? 'light';
  const colors = Colors[colorScheme];
  // 使用 useMemo 缓存样式以提高性能
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);
  return (
    <>
      {categories.map((category, categoryIndex) => (
        <View key={categoryIndex}>
          <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
          
          {category.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryItem,
                item.disabled && styles.categoryItemDisabled
              ]}
              onPress={!item.disabled ? item.action : undefined}
              disabled={item.disabled}
            >
              <View style={styles.categoryLeft}>
                <View style={styles.iconContainer}>
                  <Feather name={item.icon as any} size={16} color="#6b7280" />
                </View>
                <View>
                  <ThemedText style={styles.categoryItemTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.categoryItemDescription}>{item.description}</ThemedText>
                </View>
              </View>
              {!item.disabled ? (
                <Feather name="chevron-right" size={16} color="#6b7280" />
              ) : (
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>Soon</ThemedText>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </>
  );
}