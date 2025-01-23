import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginBtn from "../../components/LoginBtn";
import InputBox from "../../components/InputBox";
import WhiteLogo from "../../assets/Logo_White.svg";
import KakaoLogo from "../../assets/Kakao_Logo.svg"
import { IoMdEye, IoMdEyeOff  } from "react-icons/io";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  background-color: #000;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 
  gap: 0.5rem; 
  margin: 0rem 0.95rem;
`;

const Logo = styled.img`
  width: 9.1875rem; 
  height: 5rem; 
  margin-bottom: 1.19rem;
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 90%; 
  margin: 0.38rem; 
`;

const Line = styled.div` 
  margin: 0.8rem;
  height: 0.03rem; 
  width: 40%;
  background: #7E7E7E; 
`;

const Text = styled.span`
  width: 1.875rem;
  height: 0.8125rem;
  color: #7E7E7E; 
  font-size: 0.625rem; 
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: underline; 
  color: #7E7E7E; 
  font-size: 0.875rem;
  font-weight: 400;
  display: inline-block; 
  margin-top: 0.8rem;

  &:visited {
    color: #7E7E7E; 
  }

  &:active {
    color: #E6E6E6; 
  }
`;

function Signup() {
  const [isActive, setIsActive] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const isButtonEnabled = email.trim() !== "" && password.trim() !== "";

  return (
    <Wrapper>
      <Container>
        <Logo src={WhiteLogo} alt="White Logo" />
        <InputBox
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={
            isPasswordVisible ? (
              <IoMdEye style={{ fontSize: "1.06rem" }} />
            ) : (
              <IoMdEyeOff style={{ fontSize: "1.06rem" }} />
            )
          }
          onIconClick={() => setPasswordVisible(!isPasswordVisible)}
        />
        <LoginBtn
          text="Login"
          isActive={isButtonEnabled}
          onClick={() => {
            if (isButtonEnabled) {
              setIsActive(!isActive);
            }
          }}
        />
        <DividerContainer>
          <Line />
          <Text>or</Text>
          <Line />
        </DividerContainer>
        <LoginBtn
          text="Kakao Login"
          bgColor="#FEE500"
          textColor="#3A1D1D"
          borderColor="#FEE500"
          imageSrc = {KakaoLogo}
          onClick={() => {
            if (isButtonEnabled) {
              setIsActive(!isActive);
            }
          }}
        />
        <StyledLink to="/setting">회원가입</StyledLink>;
      </Container>
    </Wrapper>
  );
}

export default Signup;
