import { TokenReq as getApi } from '../apis/axiosInstance';

const getMagazinelist = async(setmagazinebtn,setmagazinearray)=>{
    await getApi.get("/magazines")
    .then((res)=>{
      console.log(res.data.result)
      const newarr = res.data.result.map((v)=>{
        if(v.name === '전체'){
          return 1;
        }
        return 0})
      console.log(newarr)
      setmagazinebtn(newarr)
      setmagazinearray(res.data.result)
    })
    .catch((error)=>{console.error(error)})
  }

export default getMagazinelist