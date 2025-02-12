import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenReq } from "../../apis/axiosInstance";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const OAuth = () => {
  const navigate = useNavigate();

  console.log("✅ OAuth 컴포넌트 실행됨, 토큰 요청 시작!");

  useEffect(() => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    // 🔄 백엔드에 요청하여 `access_token`을 헤더에서 가져옴
    TokenReq.get(`${baseURL}/oauth2/callback`, { withCredentials: true })
      .then((res) => {
        console.log("✅ 백엔드 응답 헤더:", res.headers);

        // ✅ 응답 헤더에서 Authorization과 Refresh Token 가져오기
        const authorizationHeader = res.headers["authorization"];
        const refreshToken = res.headers["set-cookie"] || res.headers["refreshToken"];

        if (authorizationHeader) {
          const accessToken = authorizationHeader.split(" ")[1];
          console.log("✅ 받은 액세스 토큰:", accessToken);
          console.log("✅ 받은 리프레시 토큰:", refreshToken);

          // ✅ 토큰을 쿠키에 저장
          cookies.set("accessToken", accessToken, { path: "/" });
          if (refreshToken) {
            cookies.set("refreshToken", refreshToken, { path: "/" });
          }

          // ✅ Axios 전역 설정 업데이트
          TokenReq.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

          console.log("✅ 즉시 메인 페이지로 이동");
          navigate("/");
        } else {
          console.error("❌ 백엔드 응답에 Authorization 헤더가 없음");
        }
      })
      .catch((err) => {
        console.error("❌ 로그인 실패:", err);
      });
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default OAuth;
