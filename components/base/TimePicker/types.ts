export interface AntTimePickerProps {
  visible: boolean;
  startTime?: string;
  endTime?: string;
  onConfirm: (startTime: string, endTime: string) => void;
  onCancel: () => void;
  title?: string;
  minTime?: string;
  maxTime?: string;
}
export const baseColumns = function(){
// 可选的小时数组 (0-23)
  const hours = Array.from({ length: 24 }, (_, i: number) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString().padStart(2, "0"),
  }));
  // 可选的分钟数组 (只能是 0, 15, 30, 45)
  const minutes = [0, 15, 30];
  const minutesFormatted = minutes.map((minute: number) => ({
    label: minute.toString().padStart(2, "0"),
    value: minute.toString().padStart(2, "0"),
  }));
  const columns = [hours, minutesFormatted];
  return columns;
}

export  const generateColumns = (startTime?: string,endTime?: string,time?:any) => {
    // 使用 lodash range 生成小时数组 (0-23)
    const allHours = Array.from({ length: 24 }, (_, i: number) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString().padStart(2, "0"),
  }));
    
    // 可选的分钟数组 (只能是 0, 15, 30, 45)
    const allMinutes = [0, 15, 30].map((minute: number) => ({
    label: minute.toString().padStart(2, "0"),
    value: minute.toString().padStart(2, "0"),
  }));

    // 如果没有时间限制，返回默认的完整时间列表
    if (!startTime && !endTime) {
      return [allHours, allMinutes];
    }

    let filteredHours = allHours;
    let filteredMinutes = allMinutes;

    // 如果startTime存在，说明现在在选择结束时间，过滤掉startTime之前的时间
    if (startTime) {
      const [startHour, startMinute] = startTime.split(':').map(Number);
     
      
      filteredHours = allHours.filter(hour => parseInt(hour.value) >= startHour);

      // 如果选择的小时等于开始时间的小时，则分钟必须大于等于开始时间的分钟
      filteredMinutes = allMinutes.filter(minute => {
        const currentHour = time?.[0] ? parseInt(time?.[0]) : 0;
        return currentHour !== startHour || parseInt(minute.value) >= startMinute;
      });
    }

    // 如果endTime存在，说明现在在选择开始时间，过滤掉endTime之后的时间
    if (endTime) {
       const [endHour, endMinute] = endTime.split(':').map(Number);
      
      filteredHours = allHours.filter(hour => parseInt(hour.value) <= endHour);

      // 如果选择的小时等于结束时间的小时，则分钟必须小于等于结束时间的分钟
      filteredMinutes = allMinutes.filter(minute => {
        const currentHour = time?.[0] ? parseInt(time?.[0]) : 0;
        return currentHour !== endHour || parseInt(minute.value) <= endMinute;
      });
    }

    return [filteredHours, filteredMinutes];
  };
  