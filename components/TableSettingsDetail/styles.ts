import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveIcon: {
    marginRight: 4,
  },
  saveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  lastCard: {
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  intervalRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  intervalButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  intervalButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  intervalButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  intervalButtonTextActive: {
    color: '#fff',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    backgroundColor: '#f3f4f6',
  },
  counterContent: {
    flex: 1,
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  counterLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  slotsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  badgeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  slotButton: {
    width: '30%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
  },
  slotButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  slotButtonInactive: {
    backgroundColor: '#fff',
    borderColor: '#d1d5db',
  },
  slotButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  slotButtonTextActive: {
    color: '#fff',
  },
  slotButtonTextInactive: {
    color: '#6b7280',
  },
  guestGroup: {
    flex: 1,
  },
  guestCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guestButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestButtonDisabled: {
    backgroundColor: '#f3f4f6',
  },
  guestValue: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 24,
    textAlign: 'center',
  },
});