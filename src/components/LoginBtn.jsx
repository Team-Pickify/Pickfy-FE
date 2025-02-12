import React from "react";
import styled from "styled-components";


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
  cursor: ${({ isActive, text }) => (text === "로그인으로 이동" ? "pointer" : isActive ? "pointer" : "not-allowed")};
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;


const Image = styled.img`
  width: 1.0625rem;
  height: 1.0625rem;  
  margin-right: 0.5rem; 
  color: #3A1D1D;
`;



const LoginBtn = ({ 
  text = "Login",
  isActive = true,  
  onClick,
  imageSrc,
  bgColor,
  textColor,
  borderColor,
}) => {
  return (
    <div style={{ width: "100%" }}> 
      <StyledButton 
        isActive={isActive} 
        onClick={onClick}
        bgColor={bgColor}
        textColor={textColor}
        borderColor={borderColor}>
        {imageSrc && <Image src={imageSrc} alt="icon" />}
        {text}
      </StyledButton>
    </div>
  );
};

export default LoginBtn;