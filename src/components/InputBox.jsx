import React, { useState } from "react";
import styled from "styled-components";
import {theme} from "../styles/themes";
import { IoMdEye, IoMdEyeOff, IoIosArrowForward } from "react-icons/io";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.9375rem;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 6.25rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0.3rem;
`;
const Span = styled.div`
  color: #7E7E7E;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  padding-left: 2.12rem;
`
const InputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: #000;
  padding: 0.65rem 0rem;
  padding-left: 2.12rem;
  background: transparent;
  &::-webkit-input-placeholder {
    color: ${theme.Sub2}; 
  }
`;

const Icon = styled.div`
  display: flex; 
  align-items: center; 
  justify-content: center;
  cursor: pointer;
  padding-right: 2.12rem;
  color: ${theme.Sub3};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-family: Pretendard;
  border: none;
  width: 6.3rem; 
  height: 2.1rem;
  padding: 0.5rem 0rem;
  border-radius: 6.25rem; 
  border: 1px solid #FFF; 
  background-color: ${({ isClicked }) =>
    isClicked ?  "#7E7E7E" : "black"}; 
  color: white; 
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  text-align: left;
  color: #7E7E7E;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.pre`
  white-space: pre-wrap;  /* 줄바꿈 유지 */
  word-break: break-word; /* 긴 단어도 줄바꿈 */
  overflow-y: auto; /* 내용이 많아지면 스크롤 가능 */
  max-height: calc(80vh - 50px);
  flex-grow: 1;
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: center; 
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.4rem 1rem;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


const InputBox = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  isReadOnly = false,
  isIcon = false, 
  iconType = "eye",
  onIconClick,
  onBtnClick, 
  isIBtnActive = false,
  BtnText,
  isClicked
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (value) => {
    if (value === "1.서비스이용약관") {
      setModalContent(`제 1 조 (목적)
본 약관은 Pickify(피키파이) 애플리케이션(이하 "서비스")와 이용자(이하 "회원") 간의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.

제 2 조 (용어 정의)

1. "서비스"란 회사가 운영하는 애플리케이션 및 관련 웹사이트에서 제공하는 모든 기능을 의미합니다.
2. "회원"이란 본 약관에 동의하고 서비스를 이용하는 개인 또는 법인을 의미합니다.
3. "콘텐츠"란 서비스 내에서 회원이 게시하거나 제공받는 텍스트, 이미지, 영상 등의 모든 자료를 의미합니다.

제 3 조 (약관의 효력 및 변경)

1. 본 약관은 회원이 동의함으로써 효력이 발생합니다.
2. 회사는 필요 시 관련 법령을 위배하지 않는 범위 내에서 약관을 변경할 수 있으며, 변경 사항은 서비스 내 공지사항을 통해 사전 고지합니다.

제 4 조 (회원가입 및 계정 관리)

1. 회원가입은 본 약관과 개인정보 처리방침에 동의한 후 회사가 제공하는 절차를 완료함으로써 이루어집니다.
2. 회원은 계정 정보를 정확하게 제공해야 하며, 타인의 정보를 도용할 경우 서비스 이용이 제한될 수 있습니다.

제 5 조 (서비스의 제공 및 변경)

1. 회사는 회원에게 다양한 기능 및 콘텐츠를 제공할 수 있으며, 필요에 따라 서비스를 변경하거나 중단할 수 있습니다.
2. 서비스 변경 시 회원에게 사전 공지하며, 중대한 변경의 경우 개별 안내를 시행할 수 있습니다.

제 6 조 (회원의 의무)

1. 회원은 본 약관 및 관련 법령을 준수하여야 하며, 서비스 이용 중 불법 행위를 해서는 안 됩니다.
2. 회원은 타인의 권리를 침해하거나 부적절한 콘텐츠를 게시해서는 안 됩니다.

제 7 조 (서비스 이용 제한 및 계약 해지)

1. 회사는 회원이 본 약관을 위반하거나 서비스 운영을 방해하는 경우, 서비스 이용을 제한하거나 계정을 삭제할 수 있습니다.
2. 회원은 언제든지 계정 삭제를 요청할 수 있으며, 관련 데이터는 회사의 정책에 따라 삭제될 수 있습니다.

제 8 조 (책임의 제한)

1. 회사는 서비스 제공과 관련하여 회원에게 발생한 손해에 대해 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.
2. 회원이 서비스 이용 과정에서 발생하는 법적 문제에 대한 책임은 회원 본인에게 있습니다.

제 9 조 (준거법 및 분쟁 해결)
본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁이 발생할 경우 회사의 소재지를 관할하는 법원을 전속 관할법원으로 합니다.`);
    } else if (value === "2.개인정보처리방침") {
      setModalContent(`제 1 조 (목적)
본 개인정보 처리방침은 Pickify(피키파이) 서비스(이하 "서비스")를 이용하는 회원의 개인정보를 보호하고, 이를 적절히 처리하는 방법을 안내하기 위해 마련되었습니다.

제 2 조 (수집하는 개인정보 항목)
회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다. 위치 기반 서비스를 원활하게 제공하기 위해 GPS 데이터를 포함한 위치 정보를 수집할 수 있습니다.

1. 회원가입 시: 이메일, 비밀번호, 닉네임
2. 서비스 이용 시: 기기 정보, 접속 로그, 쿠키
3. 고객 문의 시: 이름, 연락처, 문의 내용

제 3 조 (개인정보의 이용 목적)
수집된 개인정보는 다음과 같은 목적으로 이용됩니다. 위치 정보의 경우 서비스 내 지도 기능 제공의 목적으로 활용됩니다.

1. 회원가입 및 서비스 이용 관리
2. 맞춤형 콘텐츠 및 광고 제공
3. 고객 문의 응대 및 서비스 개선
4. 법적 의무 이행 및 분쟁 해결

제 4 조 (개인정보의 보관 및 파기)

1. 회사는 회원 탈퇴 시 지체 없이 개인정보를 파기하며, 관련 법령에 따라 일정 기간 보관할 수 있습니다.
2. 전자적 파일 형태의 개인정보는 복구할 수 없는 방식으로 안전하게 삭제합니다.

제 5 조 (개인정보 제공 및 위탁)

1. 회사는 회원의 동의 없이 개인정보를 외부에 제공하지 않습니다.
2. 원활한 서비스 제공을 위해 일부 업무를 외부 업체에 위탁할 수 있으며, 이 경우 회원에게 사전 고지합니다.

제 6 조 (회원의 권리 및 행사 방법)

1. 회원은 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수 있습니다.
2. 회원이 개인정보 삭제를 요청할 경우, 법령에 따라 보관해야 하는 정보를 제외하고 즉시 삭제됩니다.

제 7 조 (개인정보 보호를 위한 기술적 및 관리적 조치)
회사는 개인정보 보호를 위해 다음과 같은 조치를 시행합니다.

1. 개인정보 암호화 및 접근 제한
2. 보안 프로그램 운영 및 정기 점검
3. 개인정보 보호 교육 시행

제 8 조 (문의처)
개인정보와 관련한 문의는 아래 연락처로 문의해 주세요.

- 인스타그램 @pickify_official

본 개인정보 처리방침은 2025년 2월 21일부터 적용됩니다.`);
    } else {
      return;
    }
    setIsModalOpen(true);
  };

  const getIconComponent = () => {
    switch (iconType) {
      case "eye":
        return <IoMdEye size={20} />;
      case "eye-off":
        return <IoMdEyeOff size={20} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Container>
        {isReadOnly ? ( 
          <Span onClick={() => openModal(value)}>
            {value}
            <IoIosArrowForward size={12} />
          </Span>
        ) : (
          <InputField 
            type={type} 
            placeholder={placeholder}
            value={value} 
            onChange={onChange}
          />
       )}
        {isIcon && <Icon onClick={onIconClick}>{getIconComponent()}</Icon>}
        {isIBtnActive && <Button isClicked={isClicked} onClick={onBtnClick}>{BtnText}</Button>}
      </Container>

      {isModalOpen && (
        <ModalBackground onClick={() => setIsModalOpen(false)}> 
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <p>{value}</p>
            <ModalContent>{modalContent}</ModalContent>
            <CloseButtonWrapper>
              <CloseButton onClick={() => setIsModalOpen(false)}>닫기</CloseButton>
            </CloseButtonWrapper>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
    
  );
};

export default InputBox;