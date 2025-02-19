import axios from "axios";

const TokenReq = axios.create({
  headers: {
    accept: "application/json",
  },
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});

// 응답 인터셉터 추가
TokenReq.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.data.code === 4013) {
      console.log("토큰 만료: 리프레시 토큰 요청 중...");
      try {
        // TokenReq 사용하여 리프레시 토큰 요청
        const refreshResponse = await TokenReq.post("/auth/reissue");

        if (refreshResponse.data.isSuccess) {
          console.log("토큰 재발급 성공");
          // 기존 요청을 재시도
          return TokenReq(error.config);
        } else {
          console.log("토큰 재발급 실패");
        }
      } catch (refreshError) {
        console.error("리프레시 토큰 요청 에러:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { TokenReq };
