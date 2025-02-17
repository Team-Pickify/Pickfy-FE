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
      setModalContent("서비스 이용약관 내용이 여기에 들어갑니다.");
    } else if (value === "2.개인정보처리방침") {
      setModalContent("개인정보 처리방침 내용이 여기에 들어갑니다.");
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
            <p>{modalContent}</p>
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