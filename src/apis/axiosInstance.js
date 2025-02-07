import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const TokenReq = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    accept: "application/json",
  },
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});

// 요청 인터셉터에서 쿠키에서 토큰을 가져와 Authorization 헤더에 추가
TokenReq.interceptors.request.use(
  (config) => {
    const refreshToken = cookies("refreshToken"); // 쿠키에서 리프레시 토큰 가져오기

    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`; // 리프레시 토큰을 Authorization 헤더에 추가
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { TokenReq };
