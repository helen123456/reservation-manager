import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const createStyles = (theme: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: theme.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // 为iPhone底部安全区域留空间
    maxHeight: screenHeight * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  cancelText: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text,
  },
  confirmText: {
    fontSize: 16,
    color: theme.primary,
    fontWeight: '600',
  },
  confirmTextDisabled: {
    color: theme.textSecondary,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 200,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  columnLabel: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 10,
    fontWeight: '500',
  },
  separator: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  pickerItem: {
    fontSize: 16,
    color: theme.text,
  },
  selectionDisplay: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '500',
  },
  errorContainer:{
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: theme.error || '#ff4444',
    marginTop: 4,
  },
});