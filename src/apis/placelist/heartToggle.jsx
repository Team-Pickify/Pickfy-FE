import { TokenReq } from "../axiosInstance";

export const toggleHeartAPI = async (placeId) => {
  try {
    const res = await TokenReq.patch(`/places/toggle?placeId=${placeId}`, null);
    console.log(`✅ 하트 상태 변경 성공 (id: ${placeId}):`, res.data);
    return res.data;
  } catch (error) {
    console.error(`❌ 하트 상태 변경 실패 (id: ${placeId}):`, error);
    throw error;
  }
};
