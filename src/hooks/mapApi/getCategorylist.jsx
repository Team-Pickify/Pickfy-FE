import { TokenReq as getApi } from '../../apis/axiosInstance';

const getCategorylist = async(setcategorybtn,setcategoryarray)=>{
    await getApi.get("/categories")
    .then((res)=>{
      console.log(res.data.result)
      const newarr = res.data.result.map((v)=>{
         if(v.name === '전체'){
           return 1;
        }
        return 0})
      console.log(newarr)
      setcategorybtn(newarr)
      setcategoryarray(res.data.result)
    })
    .catch((error)=>{console.error(error)})
  }

export default getCategorylist