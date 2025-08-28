import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  required: {
    color: '#ef4444', // 红色表示必填
  },
  inputContainer: {
     height: 50,
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
      backgroundColor: "#f9fafb",
  },
  focusedContainer: {
    borderColor: '#3b82f6',
    boxShadow:' 0 0 0 1px #3b82f6',
    elevation: 2,
  },
  errorContainer: {
    borderColor: '#ef4444',
  },
  disabledContainer: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingHorizontal: 12,
    height:60,
    
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    textAlignVertical: 'center',
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  androidFix: {
    paddingVertical: 12,
  },
  icon: {
    padding: 8,
  },
  leftIcon: {
    marginLeft: 4,
  },
  rightIcon: {
    marginRight: 4,
  },
  clearButton: {
    padding: 8,
    marginRight: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    marginLeft: 4,
  },
});