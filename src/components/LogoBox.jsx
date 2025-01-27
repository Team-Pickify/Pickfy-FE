import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import styled from "styled-components";
import { GoArrowLeft } from "react-icons/go";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #000;
  width: 100%;
  height: 100%;
`;

const LogoCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 8.56rem;
  margin-bottom: 3.31rem;
`;

const Logo = styled.img`
  width: 9.1875rem;
  height: 5rem;
  margin-bottom: 0.1rem;
`;

const LogoText = styled.span`
  color: #FFF;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-left: 1.5rem;
`;

const IconWrapper = styled.div`
  margin-top: 3.5rem;
  margin-left: 1.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

function LogoBox({ showIcon = true, logoSrc, logoText }) {
  const navigate = useNavigate(); 

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <Wrapper>
      {showIcon && (
        <IconWrapper onClick={handleGoBack}>
          <GoArrowLeft size={28} color="#FFF" />
        </IconWrapper>
      )}
      <LogoCon>
        {logoSrc && <Logo src={logoSrc} alt="Logo" />}
        {logoText && <LogoText>{logoText}</LogoText>}
      </LogoCon>
    </Wrapper>
  );
}

export default LogoBox;
