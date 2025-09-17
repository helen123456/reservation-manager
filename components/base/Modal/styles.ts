import { StyleSheet } from 'react-native';

export const createStyles = (theme: any) => {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    modalContainer: {
      backgroundColor: theme.card,
      borderRadius: 12,
      minWidth: 280,
      maxWidth: '90%',
      shadowColor: theme.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      position: 'relative'
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    closeButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.mutedForeground,
      lineHeight: 18,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
    },
    content: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      minHeight: 60,
    },
    buttonContainer: {
      flexDirection: 'row',
     
    },
    button: {
      flex: 1,
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
     
      borderBottomLeftRadius: 12,
    },
    okButton: {
      borderBottomRightRadius: 12,
    },
    singleButtonContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    singleButton: {
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
  });
};