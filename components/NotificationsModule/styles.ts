import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
    marginRight: 16
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    marginTop: -4,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#1a1a1a",
    marginRight: 8,
  },
  badge: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  headerActions: {
    
    
    flexDirection: "row", 
    gap: 8,
    justifyContent: "flex-end",
    marginBottom: 16,
    marginRight: 16
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000"
  },
  actionButtonText: {
    color: "#000",
    fontSize: 14,
    marginLeft: 4,
  },
  emptyState: {
    borderRadius: 12,
    padding: 32,
    alignItems: "center"
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  unreadCard: {
    borderColor: "#D1D5DC",
    backgroundColor: "#F8F9FA",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  notificationBody: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
  },
  readTitle: {
    color: "#666",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  customerText: {
    fontSize: 12,
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
});