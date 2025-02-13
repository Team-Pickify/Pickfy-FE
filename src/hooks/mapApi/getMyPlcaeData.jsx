import { TokenReq as getApi } from "../../apis/axiosInstance"

const getMyplaceData = async ()=>{
    try {
        const res = await getApi.get('/places');
        console.log(res.data); 
        return res.data.result;
    } catch (error) {
        console.error(error);
    }
}

export default getMyplaceData