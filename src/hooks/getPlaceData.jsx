import { TokenReq as getApi } from '../apis/axiosInstance';

const getPlaceData = async (cate, maga, setplacearray, categoryarray, magazinearray, curlatitude, curlongitude) => {
  try {
    let arr1 = [];
    let arr2 = [];

    for(let i=0;i<cate.length;i++){
        if(cate[i] === 1){
          arr1 = [...arr1,categoryarray[i].id]
        }
      }
      for(let i=0;i<maga.length;i++){
        if(maga[i] === 1){
          arr2 = [...arr2,magazinearray[i].id]
        }
      }
      console.log(arr1,arr2)
      if(arr1.length === 0 && arr2.length === 0) return []
    const response = await getApi.post("/places/nearby", {
      latitude: curlatitude,
      longitude: curlongitude,
      distance: 5000,
      categoryIds: arr1,
      magazineIds: arr2,
    });

    console.log(response.data);
    setplacearray(response.data.result);
    
    return response.data.result; // Promise 반환
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error; // 상위 호출 함수에서 에러 핸들링 가능하도록 throw
  }
};

export default getPlaceData;
