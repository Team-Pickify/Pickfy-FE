import styled from "styled-components";
import { theme } from "../../styles/themes";
import kakaoLogo from "../../assets/Kakao_Logo.svg";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 21.5625rem;
  padding: 1.875rem;
  border-radius: 1.25rem;
  gap: 0.62rem;
  background: #fff;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.1);
  z-index: 99;
`;
const UrlContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 17.8125rem;
  height: 2.5rem;
  padding: 0.37rem 0.44rem 0.37rem 0.625rem;
  border-radius: 6.25rem;
  border: 1px solid ${theme.Sub2};
`;
const ShowUrl = styled.div`
  display: flex;
  align-items: center;
  width: 11.87rem;
`;
const CopyBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 3.5625rem;
  height: 1.75rem;
  gap: 0.625rem;
  border-radius: 6.25rem;
  background-color: ${theme.Text};
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
`;
const KakaoShareBtn = styled.div`
  display: flex;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 4.75rem;
  background: ${theme.KakaoYellow};
  color: ${theme.KakaoBrown};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
`;

export default function ShareModal({ isOpen, onClose, onToast, placeId }) {
  //const url = window.location.href; //현재 url 가져오기
  const url = `${window.location.origin}/${placeId}`;
  if (!isOpen) return null;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      onClose();
      onToast("클립보드에 복사되었습니다");
    });
  };

  const share = () => {
    if (!navigator.canShare) {
      alert("지원되지 않는 브라우저입니다");
      return;
    }
    navigator.share({
      title: document.title,
      url: document.location.href,
    });
  };
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <UrlContainer>
          <ShowUrl>{url}</ShowUrl>
          <CopyBtn onClick={copyToClipboard}>복사</CopyBtn>
        </UrlContainer>
        <KakaoShareBtn onClick={share}>
          <img src={kakaoLogo} alt="카카오로고" />
          카카오톡으로 공유하기
        </KakaoShareBtn>
      </Container>
    </Overlay>
  );
}
