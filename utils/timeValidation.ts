/**
 * 时间验证工具函数
 */

// 允许的分钟值
const ALLOWED_MINUTES = [0, 15, 30];

/**
 * 解析时间字符串为小时和分钟
 * @param timeString 时间字符串，格式: "HH:MM"
 * @returns {hour: number, minute: number}
 */
export const parseTime = (timeString: string): { hour: number; minute: number } => {
  const [hour, minute] = timeString.split(':').map(Number);
  return { hour: hour || 0, minute: minute || 0 };
};

/**
 * 格式化时间为字符串
 * @param hour 小时 (0-23)
 * @param minute 分钟 (0, 15, 30)
 * @returns 格式化的时间字符串 "HH:MM"
 */
export const formatTime = (hour: number, minute: number): string => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

/**
 * 验证分钟是否在允许的范围内
 * @param minute 分钟值
 * @returns 是否有效
 */
export const isValidMinute = (minute: number): boolean => {
  return ALLOWED_MINUTES.includes(minute);
};

/**
 * 验证时间格式是否正确
 * @param timeString 时间字符串
 * @returns 是否有效
 */
export const isValidTimeFormat = (timeString: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
};

/**
 * 验证时间是否有效（格式正确且分钟在允许范围内）
 * @param timeString 时间字符串
 * @returns 是否有效
 */
export const isValidTime = (timeString: string): boolean => {
  if (!isValidTimeFormat(timeString)) {
    return false;
  }
  
  const { minute } = parseTime(timeString);
  return isValidMinute(minute);
};

/**
 * 比较两个时间的大小
 * @param time1 时间1
 * @param time2 时间2
 * @returns -1: time1 < time2, 0: time1 = time2, 1: time1 > time2
 */
export const compareTime = (time1: string, time2: string): number => {
  const { hour: h1, minute: m1 } = parseTime(time1);
  const { hour: h2, minute: m2 } = parseTime(time2);
  
  const totalMinutes1 = h1 * 60 + m1;
  const totalMinutes2 = h2 * 60 + m2;
  
  if (totalMinutes1 < totalMinutes2) return -1;
  if (totalMinutes1 > totalMinutes2) return 1;
  return 0;
};

/**
 * 验证营业时间是否有效
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @returns {isValid: boolean, error?: string}
 */
export const validateBusinessHours = (
  startTime: string,
  endTime: string
): { isValid: boolean; error?: string } => {
  // 验证时间格式
  if (!isValidTime(startTime)) {
    return {
      isValid: false,
      error: '开始时间格式无效，分钟只能是00、15或30'
    };
  }
  
  if (!isValidTime(endTime)) {
    return {
      isValid: false,
      error: '结束时间格式无效，分钟只能是00、15或30'
    };
  }
  
  // 验证结束时间不能小于开始时间
  if (compareTime(endTime, startTime) <= 0) {
    return {
      isValid: false,
      error: '结束时间必须大于开始时间'
    };
  }
  
  return { isValid: true };
};

/**
 * 修正时间的分钟值到最近的有效值
 * @param timeString 时间字符串
 * @returns 修正后的时间字符串
 */
export const correctTimeMinutes = (timeString: string): string => {
  if (!isValidTimeFormat(timeString)) {
    return '09:00'; // 默认值
  }
  
  const { hour, minute } = parseTime(timeString);
  
  // 找到最近的有效分钟值
  let correctedMinute = 0;
  if (minute <= 7) {
    correctedMinute = 0;
  } else if (minute <= 22) {
    correctedMinute = 15;
  } else if (minute <= 37) {
    correctedMinute = 30;
  } else if (minute <= 52) {
    correctedMinute = 45; // 但我们只允许0,15,30，所以改为30
    correctedMinute = 30;
  } else {
    correctedMinute = 0;
    // 如果分钟接近60，则进位到下一小时
    return formatTime((hour + 1) % 24, 0);
  }
  
  return formatTime(hour, correctedMinute);
};

/**
 * 获取允许的分钟选项
 * @returns 允许的分钟数组
 */
export const getAllowedMinutes = (): number[] => {
  return [...ALLOWED_MINUTES];
};