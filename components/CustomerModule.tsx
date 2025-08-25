import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  vipLevel: 'regular' | 'silver' | 'gold' | 'diamond';
  totalReservations: number;
  averagePartySize: number;
  lastVisit: string;
  preferredTime: string;
  specialRequests: string[];
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: '张小明',
    phone: '138-1234-5678',
    email: 'zhang@example.com',
    vipLevel: 'gold',
    totalReservations: 15,
    averagePartySize: 3,
    lastVisit: '2024-01-15',
    preferredTime: '晚上 7:00-8:00',
    specialRequests: ['无香菜', '儿童椅']
  },
  {
    id: 2,
    name: '李小红',
    phone: '139-5678-9012',
    email: 'li@example.com',
    vipLevel: 'silver',
    totalReservations: 8,
    averagePartySize: 2,
    lastVisit: '2024-01-10',
    preferredTime: '中午 12:00-1:00',
    specialRequests: ['靠窗位置']
  },
  {
    id: 3,
    name: '王小强',
    phone: '137-9012-3456',
    email: 'wang@example.com',
    vipLevel: 'regular',
    totalReservations: 3,
    averagePartySize: 4,
    lastVisit: '2024-01-08',
    preferredTime: '晚上 6:30-7:30',
    specialRequests: []
  }
];

function getVipBadge(vipLevel: string) {
  const getBadgeStyle = () => {
    switch (vipLevel) {
      case 'diamond': return styles.diamondBadge;
      case 'gold': return styles.goldBadge;
      case 'silver': return styles.silverBadge;
      default: return styles.regularBadge;
    }
  };

  const getBadgeText = () => {
    switch (vipLevel) {
      case 'diamond': return '钻石会员';
      case 'gold': return '金牌会员';
      case 'silver': return '银牌会员';
      default: return '普通会员';
    }
  };

  return (
    <ThemedView style={[styles.vipBadge, getBadgeStyle()]}>
      <ThemedText style={styles.vipBadgeText}>{getBadgeText()}</ThemedText>
    </ThemedView>
  );
}

export default function CustomerModule() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  if (selectedCustomer) {
    return (
      <ScrollView style={styles.container}>
        <ThemedView style={styles.detailHeader}>
          <TouchableOpacity
            onPress={() => setSelectedCustomer(null)}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={20} color="#000" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>客户详情</ThemedText>
        </ThemedView>

        <ThemedView style={styles.customerDetailCard}>
          <ThemedView style={styles.customerHeader}>
            <ThemedView style={styles.customerAvatarContainer}>
              <ThemedView style={styles.customerAvatar}>
                <ThemedText style={styles.customerAvatarText}>
                  {selectedCustomer.name.charAt(0)}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.customerInfo}>
                <ThemedText style={styles.customerName}>{selectedCustomer.name}</ThemedText>
                <ThemedView style={styles.customerContactRow}>
                  <Ionicons name="call" size={14} color="#6b7280" />
                  <ThemedText style={styles.customerContact}>{selectedCustomer.phone}</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            {getVipBadge(selectedCustomer.vipLevel)}
          </ThemedView>

          <ThemedView style={styles.statsRow}>
            <ThemedView style={styles.statBox}>
              <ThemedText style={styles.statValue}>{selectedCustomer.totalReservations}</ThemedText>
              <ThemedText style={styles.statLabel}>总预订次数</ThemedText>
            </ThemedView>
            <ThemedView style={styles.statBox}>
              <ThemedText style={styles.statValue}>{selectedCustomer.averagePartySize}</ThemedText>
              <ThemedText style={styles.statLabel}>平均用餐人数</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.detailsSection}>
            <ThemedView style={styles.detailItem}>
              <ThemedText style={styles.detailLabel}>最后来访</ThemedText>
              <ThemedText style={styles.detailValue}>{selectedCustomer.lastVisit}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailItem}>
              <ThemedText style={styles.detailLabel}>偏好时间</ThemedText>
              <ThemedText style={styles.detailValue}>{selectedCustomer.preferredTime}</ThemedText>
            </ThemedView>

            {selectedCustomer.specialRequests.length > 0 && (
              <ThemedView style={styles.detailItem}>
                <ThemedText style={styles.detailLabel}>特殊要求</ThemedText>
                <ThemedView style={styles.requestsContainer}>
                  {selectedCustomer.specialRequests.map((request, index) => (
                    <ThemedView key={index} style={styles.requestTag}>
                      <ThemedText style={styles.requestText}>{request}</ThemedText>
                    </ThemedView>
                  ))}
                </ThemedView>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>客户管理</ThemedText>
        <ThemedView style={styles.totalBadge}>
          <ThemedText style={styles.totalBadgeText}>共 {mockCustomers.length} 位客户</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* 搜索 */}
      <ThemedView style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜索客户姓名或电话"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      {/* 客户列表 */}
      <ThemedView style={styles.customerList}>
        {filteredCustomers.map((customer) => (
          <TouchableOpacity
            key={customer.id}
            style={styles.customerItem}
            onPress={() => setSelectedCustomer(customer)}
          >
            <ThemedView style={styles.customerItemContent}>
              <ThemedView style={styles.customerItemLeft}>
                <ThemedView style={styles.customerListAvatar}>
                  <ThemedText style={styles.customerListAvatarText}>
                    {customer.name.charAt(0)}
                  </ThemedText>
                </ThemedView>
                <ThemedView style={styles.customerItemInfo}>
                  <ThemedView style={styles.customerItemHeader}>
                    <ThemedText style={styles.customerItemName}>{customer.name}</ThemedText>
                    {getVipBadge(customer.vipLevel)}
                  </ThemedView>
                  <ThemedView style={styles.customerItemStats}>
                    <ThemedView style={styles.customerItemStat}>
                      <Ionicons name="calendar" size={14} color="#6b7280" />
                      <ThemedText style={styles.customerItemStatText}>
                        {customer.totalReservations}次
                      </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.customerItemStat}>
                      <Ionicons name="people" size={14} color="#6b7280" />
                      <ThemedText style={styles.customerItemStatText}>
                        平均{customer.averagePartySize}人
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
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
  totalBadge: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  totalBadgeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  searchContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 44,
    paddingRight: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  customerList: {
    paddingHorizontal: 16,
  },
  customerItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  customerItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  customerListAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerListAvatarText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerItemInfo: {
    flex: 1,
  },
  customerItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  customerItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  customerItemStats: {
    flexDirection: 'row',
    gap: 16,
  },
  customerItemStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  customerItemStatText: {
    fontSize: 14,
    color: '#6b7280',
  },
  vipBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vipBadgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: 'white',
  },
  diamondBadge: {
    backgroundColor: '#8b5cf6',
  },
  goldBadge: {
    backgroundColor: '#f59e0b',
  },
  silverBadge: {
    backgroundColor: '#6b7280',
  },
  regularBadge: {
    backgroundColor: '#10b981',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  customerDetailCard: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  customerAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  customerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerAvatarText: {
    color: '#3b82f6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  customerContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  customerContact: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  detailsSection: {
    gap: 16,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
  },
  requestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  requestTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  requestText: {
    fontSize: 12,
    color: '#3b82f6',
  },
});
