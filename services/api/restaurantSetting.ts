import request from "@/services/request";
import storage from "@/utils/storage";

export const getQuickSettingInfoApi = async () => {
  try {
    const restaurantId = await storage.getItem("restaurantId");
    const response = await request.get(
      `/restaurant/setting/quick/${restaurantId}`
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getBaseSettingInfoApi = async () => {
  try {
    const restaurantId = await storage.getItem("restaurantId");
    const response = await request.get(
      `/restaurant/setting/base/${restaurantId}`
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateBaseSettingInfoApi = async (data: any) => {
  try {
    const response = await request.post("/restaurant/setting/update", data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
