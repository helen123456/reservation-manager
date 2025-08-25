import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconSymbol } from './IconSymbol';

// 使用示例组件
export function IconSymbolExample() {
  return (
    <View style={styles.container}>
      {/* 使用 Ionicons */}
      <IconSymbol 
        library="Ionicons" 
        name="home" 
        size={24} 
        color="#007AFF" 
      />
      
      {/* 使用 MaterialIcons */}
      <IconSymbol 
        library="MaterialIcons" 
        name="settings" 
        size={24} 
        color="#34C759" 
      />
      
      {/* 使用 FontAwesome */}
      <IconSymbol 
        library="FontAwesome" 
        name="heart" 
        size={24} 
        color="#FF3B30" 
      />
      
      {/* 使用 MaterialCommunityIcons */}
      <IconSymbol 
        library="MaterialCommunityIcons" 
        name="account" 
        size={24} 
        color="#FF9500" 
      />
      
      {/* 使用 Feather */}
      <IconSymbol 
        library="Feather" 
        name="search" 
        size={24} 
        color="#5856D6" 
      />
      
      {/* 默认使用 Ionicons（不指定 library） */}
      <IconSymbol 
        name="notifications" 
        size={24} 
        color="#AF52DE" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 16,
  },
});