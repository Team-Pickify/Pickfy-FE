import { useEffect } from "react";
import styled from "styled-components";
import LogoImg from "../../../public/assets/whiteLogo.png";
import GlobalStyles from "../../styles/GlobalStyles"; // 전역 스타일 가져오기

const SplashWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000; /* 검정 배경 */
  height: 100vh; /* 화면 전체 높이 */
  width: 100%; /* 화면 전체 너비 */
  top: 0;
  left: 0;
  z-index: 1000; /* 가장 위에 표시 */
`;

const SplashImage = styled.img`
  width: 9.1875rem; /* 이미지 크기 조정 */
  height: auto;
`;

function SplashScreen({ duration = 2000, onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish(); // 시간이 지나면 부모 컴포넌트에서 전환 처리
    }, duration);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [duration, onFinish]);

  return (
    <>
      {/* GlobalStyles를 항상 렌더링 */}
      <GlobalStyles />
      <SplashWrapper>
        <SplashImage src={LogoImg} alt="Splash" />
      </SplashWrapper>
    </>
  );
}

export default SplashScreen;
