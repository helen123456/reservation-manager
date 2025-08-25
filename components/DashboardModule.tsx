import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const mockRecentActivity = [
  { id: 1, action: '新预订确认', customer: '张小明', time: '5分钟前', status: 'confirmed' },
  { id: 2, action: '取消预订', customer: '李小红', time: '15分钟前', status: 'cancelled' },
  { id: 3, action: '预订修改', customer: '王小强', time: '30分钟前', status: 'modified' },
];

const stats = {
  todayReservations: 24,
  avgPartySize: 3.2,
  totalRevenue: '¥12,580',
  peakHours: '18:00-20:00'
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
}

function StatCard({ title, value, subtitle, trend }: StatCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'remove';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return '#10b981';
      case 'down': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <ThemedView style={styles.statCard}>
      <ThemedView style={styles.statCardContent}>
        <ThemedView style={styles.statTextContainer}>
          <ThemedText style={styles.statTitle}>{title}</ThemedText>
          <ThemedText style={styles.statValue}>{value}</ThemedText>
          {subtitle && <ThemedText style={styles.statSubtitle}>{subtitle}</ThemedText>}
        </ThemedView>
        <ThemedView style={[styles.trendContainer, { backgroundColor: getTrendColor() + '20' }]}>
          <Ionicons 
            name={getTrendIcon() as any} 
            size={20} 
            color={getTrendColor()} 
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'confirmed': return styles.confirmedBadge;
    case 'cancelled': return styles.cancelledBadge;
    case 'modified': return styles.modifiedBadge;
    default: return styles.defaultBadge;
  }
}

export default function DashboardModule() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>数据概览</ThemedText>
        <ThemedView style={styles.activeBadge}>
          <ThemedText style={styles.activeBadgeText}>实时数据</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* 统计卡片 */}
      <ThemedView style={styles.statsGrid}>
        <StatCard
          title="今日预订"
          value={stats.todayReservations.toString()}
          subtitle="较昨日 +12%"
          trend="up"
        />
        <StatCard
          title="平均用餐人数"
          value={stats.avgPartySize.toString()}
          subtitle="较昨日 -0.3"
          trend="down"
        />
      </ThemedView>

      {/* 高峰时段 */}
      <ThemedView style={styles.peakHoursCard}>
        <ThemedView style={styles.peakHoursHeader}>
          <ThemedText style={styles.cardTitle}>高峰时段</ThemedText>
          <Ionicons name="trending-up" size={16} color="#10b981" />
        </ThemedView>
        <ThemedView style={styles.peakHoursContent}>
          <ThemedText style={styles.peakHoursValue}>{stats.peakHours}</ThemedText>
          <ThemedText style={styles.peakHoursDescription}>预订最集中的时间段</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* 最近活动 */}
      <ThemedView style={styles.activityCard}>
        <ThemedText style={styles.cardTitle}>最近活动</ThemedText>
        <ThemedView style={styles.activityList}>
          {mockRecentActivity.map((activity) => (
            <ThemedView key={activity.id} style={styles.activityItem}>
              <ThemedView style={styles.activityContent}>
                <ThemedText style={styles.activityAction}>{activity.action}</ThemedText>
                <ThemedText style={styles.activityDetails}>
                  {activity.customer} · {activity.time}
                </ThemedText>
              </ThemedView>
              <ThemedView style={[styles.statusBadge, getStatusColor(activity.status)]}>
                <ThemedText style={styles.statusBadgeText}>{activity.status}</ThemedText>
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  activeBadge: {
    backgroundColor: '#dcfce7',
    borderColor: '#bbf7d0',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeBadgeText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statTextContainer: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  trendContainer: {
    padding: 8,
    borderRadius: 20,
  },
  peakHoursCard: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  peakHoursHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  peakHoursContent: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
  },
  peakHoursValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  peakHoursDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  activityCard: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activityList: {
    marginTop: 16,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  activityDetails: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
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
  confirmedBadge: {
    backgroundColor: '#10b981',
  },
  cancelledBadge: {
    backgroundColor: '#ef4444',
  },
  modifiedBadge: {
    backgroundColor: '#f59e0b',
  },
  defaultBadge: {
    backgroundColor: '#6b7280',
  },
});
