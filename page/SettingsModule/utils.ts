import { i18n } from "../../utils/i18n";
import { RestaurantStatus, SettingsCategory } from './types';

const t = i18n.t.bind(i18n);

/**
 * 获取设置分类数据
 * @param onNavigate 导航函数
 * @returns 设置分类数组
 */
export const getSettingsCategories = (
  onNavigate: (section: string) => void
): SettingsCategory[] => [
  {
    title: 'Future Features',
    items: [
      {
        id: 'delivery',
        title: 'Restaurant Management',
        description: 'Set restaurant information',
        icon: 'package',
        action: () => {}
      }
    ]
  },
  {
    title: t('reservationManagement'),
    items: [
      {
        id: 'business-hours',
        title: t('businessHours'),
        description: t('setOpeningClosingTimes'),
        icon: 'clock',
        action: () => onNavigate('business-hours')
      }
    ]
  },
  
];

/**
 * 获取餐厅状态信息
 * @returns 餐厅状态对象
 */
export const getRestaurantStatus = (): RestaurantStatus => ({
  isOpen: true,
  openTime: '9:00 AM',
  closeTime: '11:00 PM',
  status: t('currentlyOpen')
});

/**
 * 格式化营业时间
 * @param openTime 开始时间
 * @param closeTime 结束时间
 * @returns 格式化的时间字符串
 */
export const formatBusinessHours = (openTime: string, closeTime: string): string => {
  return `${openTime} - ${closeTime}`;
};

/**
 * 检查餐厅是否营业
 * @param openTime 开始时间
 * @param closeTime 结束时间
 * @returns 是否营业
 */
export const isRestaurantOpen = (openTime: string, closeTime: string): boolean => {
  // 这里可以添加实际的时间检查逻辑
  return true;
};