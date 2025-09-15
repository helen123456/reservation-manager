import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import { Text } from 'react-native';
import { createStyles } from './styles';
import { SettingsCategoryProps } from './types';

export default function SettingsCategory({ categories }: SettingsCategoryProps) {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <>
      {categories.map((category, categoryIndex) => (
        <View key={categoryIndex}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          
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
                  <Text style={styles.categoryItemTitle}>{item.title}</Text>
                  <Text style={styles.categoryItemDescription}>{item.description}</Text>
                </View>
              </View>
              {!item.disabled ? (
                <Feather name="chevron-right" size={16} color="#6b7280" />
              ) : (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Soon</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </>
  );
}