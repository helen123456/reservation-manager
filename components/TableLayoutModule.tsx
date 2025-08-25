import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Table {
  id: number;
  number: string;
  seats: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  x: number;
  y: number;
  customerName?: string;
  reservationTime?: string;
}

const tables: Table[] = [
  { id: 1, number: 'T1', seats: 2, status: 'available', x: 50, y: 50 },
  { id: 2, number: 'T2', seats: 4, status: 'occupied', x: 150, y: 50, customerName: '张三', reservationTime: '19:00' },
  { id: 3, number: 'T3', seats: 6, status: 'reserved', x: 250, y: 50, customerName: '李四', reservationTime: '20:00' },
  { id: 4, number: 'T4', seats: 2, status: 'maintenance', x: 50, y: 150 },
  { id: 5, number: 'T5', seats: 4, status: 'available', x: 150, y: 150 },
  { id: 6, number: 'T6', seats: 8, status: 'available', x: 250, y: 150 },
];

const statusStats = {
  available: 3,
  occupied: 1,
  reserved: 1,
  maintenance: 1,
};

function getTableStatusColor(status: string) {
  switch (status) {
    case 'available': return '#10b981';
    case 'occupied': return '#ef4444';
    case 'reserved': return '#f59e0b';
    case 'maintenance': return '#6b7280';
    default: return '#6b7280';
  }
}

function getStatusBadgeStyle(status: string) {
  switch (status) {
    case 'available': return styles.availableBadge;
    case 'occupied': return styles.occupiedBadge;
    case 'reserved': return styles.reservedBadge;
    case 'maintenance': return styles.maintenanceBadge;
    default: return styles.defaultBadge;
  }
}

export default function TableLayoutModule() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>桌位布局</ThemedText>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={16} color="white" />
          <ThemedText style={styles.addButtonText}>添加桌位</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* 状态统计 */}
      <ThemedView style={styles.statsGrid}>
        <ThemedView style={styles.statItem}>
          <ThemedText style={styles.statValue}>{statusStats.available}</ThemedText>
          <ThemedText style={styles.statLabel}>空闲</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statItem}>
          <ThemedText style={styles.statValue}>{statusStats.occupied}</ThemedText>
          <ThemedText style={styles.statLabel}>用餐中</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statItem}>
          <ThemedText style={styles.statValue}>{statusStats.reserved}</ThemedText>
          <ThemedText style={styles.statLabel}>已预订</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statItem}>
          <ThemedText style={styles.statValue}>{statusStats.maintenance}</ThemedText>
          <ThemedText style={styles.statLabel}>维护中</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* 餐厅布局图 */}
      <ThemedView style={styles.layoutCard}>
        <ThemedView style={styles.layoutContainer}>
          {tables.map((table) => (
            <TouchableOpacity
              key={table.id}
              style={[
                styles.tableItem,
                {
                  left: table.x,
                  top: table.y,
                  backgroundColor: getTableStatusColor(table.status),
                }
              ]}
              onPress={() => setSelectedTable(table)}
            >
              <ThemedText style={styles.tableNumber}>{table.number}</ThemedText>
            </TouchableOpacity>
          ))}
          
          {/* 入口标识 */}
          <ThemedView style={styles.entrance}>
            <ThemedText style={styles.entranceText}>入口</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* 选中桌位详情 */}
      {selectedTable && (
        <ThemedView style={styles.selectedTableCard}>
          <ThemedView style={styles.selectedTableHeader}>
            <ThemedText style={styles.selectedTableTitle}>桌位 {selectedTable.number}</ThemedText>
            <ThemedView style={[styles.statusBadge, getStatusBadgeStyle(selectedTable.status)]}>
              <ThemedText style={styles.statusBadgeText}>{selectedTable.status}</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.tableDetails}>
            <ThemedView style={styles.tableDetailItem}>
              <Ionicons name="people" size={16} color="#6b7280" />
              <ThemedText style={styles.tableDetailText}>{selectedTable.seats} 座位</ThemedText>
            </ThemedView>

            {selectedTable.customerName && (
              <ThemedView style={styles.customerInfo}>
                <ThemedText style={styles.customerLabel}>客户</ThemedText>
                <ThemedText style={styles.customerName}>{selectedTable.customerName}</ThemedText>
              </ThemedView>
            )}

            {selectedTable.reservationTime && (
              <ThemedView style={styles.customerInfo}>
                <ThemedText style={styles.customerLabel}>预订时间</ThemedText>
                <ThemedText style={styles.customerName}>{selectedTable.reservationTime}</ThemedText>
              </ThemedView>
            )}
          </ThemedView>

          <ThemedView style={styles.tableActions}>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionButtonText}>编辑</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <ThemedText style={styles.primaryButtonText}>更改状态</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      )}

      {/* 桌位列表视图 */}
      <ThemedView style={styles.tableList}>
        <ThemedText style={styles.listTitle}>桌位列表</ThemedText>
        {tables.map((table) => (
          <TouchableOpacity key={table.id} style={styles.listItem}>
            <ThemedView style={styles.listItemContent}>
              <ThemedView style={styles.listItemLeft}>
                <ThemedView style={[styles.tableIndicator, { backgroundColor: getTableStatusColor(table.status) }]}>
                  <ThemedText style={styles.tableIndicatorText}>{table.number}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.listItemInfo}>
                  <ThemedText style={styles.listItemTitle}>桌位 {table.number}</ThemedText>
                  <ThemedText style={styles.listItemSubtitle}>{table.seats} 座位</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.listItemRight}>
                <ThemedView style={[styles.statusBadge, getStatusBadgeStyle(table.status)]}>
                  <ThemedText style={styles.statusBadgeText}>{table.status}</ThemedText>
                </ThemedView>
                {table.customerName && (
                  <ThemedText style={styles.customerNameSmall}>{table.customerName}</ThemedText>
                )}
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  layoutCard: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  layoutContainer: {
    position: 'relative',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    height: 300,
  },
  tableItem: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableNumber: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  entrance: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{ translateX: -25 }],
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  entranceText: {
    color: 'white',
    fontSize: 12,
  },
  selectedTableCard: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  selectedTableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedTableTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  availableBadge: {
    backgroundColor: '#10b981',
  },
  occupiedBadge: {
    backgroundColor: '#ef4444',
  },
  reservedBadge: {
    backgroundColor: '#f59e0b',
  },
  maintenanceBadge: {
    backgroundColor: '#6b7280',
  },
  defaultBadge: {
    backgroundColor: '#6b7280',
  },
  tableDetails: {
    marginBottom: 16,
  },
  tableDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tableDetailText: {
    fontSize: 14,
    color: '#374151',
  },
  customerInfo: {
    marginBottom: 8,
  },
  customerLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  customerName: {
    fontSize: 14,
    color: '#111827',
  },
  tableActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  primaryButtonText: {
    color: 'white',
  },
  tableList: {
    padding: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  tableIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableIndicatorText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listItemInfo: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  listItemRight: {
    alignItems: 'flex-end',
  },
  customerNameSmall: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});
