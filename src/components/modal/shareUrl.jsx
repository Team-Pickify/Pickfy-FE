import styled from "styled-components";

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
  border: 1px solid #e6e6e6;
  background: #fff;
`;
const ShowUrl = styled.div`
  display: flex;
  align-items: center;
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
  background: #000;
  color: #fff;
`;
const KakaoShareBtn = styled.div`
  display: flex;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 4.75rem;
  background: #fee500;
`;

export default function ShareModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <UrlContainer>
          <ShowUrl>url-----</ShowUrl>
          <CopyBtn>복사</CopyBtn>
        </UrlContainer>
        <KakaoShareBtn>카카오톡으로 공유하기</KakaoShareBtn>
      </Container>
    </Overlay>
  );
}
