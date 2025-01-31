import React from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";


const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.9375rem; 
  font-size: 1rem;
  border: none;
  width: 100%; 
  max-width: 100%; 
  height: 2.9375rem;
  border-radius: 4.75rem; 
  border: 1px solid ${({ borderColor }) => borderColor || "#FFF"}; 
  background-color: ${({ isActive, bgColor }) =>
    isActive ? bgColor || "#FF4B4B" : "black"}; 
  color: ${({ textColor }) => textColor || "white"}; 
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")}; 
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const TextContainer = styled.span`
  text-align: center;
  flex-grow: 1; /* 텍스트를 정확한 가운데 정렬 */
  margin-left: 1.41rem;
`;

const IconContainer = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const SignupBtn = ({ 
  text = "Login",
  isActive = true,  
  onClick,
  bgColor,
  textColor,
  borderColor,
  showIcon = false
}) => {
  return (
    <div style={{ width: "100%" }}> 
      <StyledButton 
        isActive={isActive} 
        onClick={onClick}
        bgColor={bgColor}
        textColor={textColor}
        borderColor={borderColor}>
        <TextContainer>{text}</TextContainer>
        {showIcon && (
          <IconContainer>
            <IoIosArrowForward size={18} color={textColor || "white"} />
          </IconContainer>
        )}
      </StyledButton>
    </div>
  );
};

export default SignupBtn;
