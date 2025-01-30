import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginBtn from "../../components/LoginBtn";
import InputBox from "../../components/InputBox";
import WhiteLogo from "../../assets/Logo_White.svg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import LogoBox from "../../components/LogoBox";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
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


function Login() {
  const [isActive, setIsActive] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isButtonEnabled = email.trim() !== "" && password.trim() !== "";

  return (
    <Wrapper>
      <Container>
       <LogoBox 
        showIcon={true} 
        logoSrc={WhiteLogo}
        logoText="관리자 로그인"/>
        <InputBox
          placeholder="사용자명"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          type={isPasswordVisible ? "text" : "password"}
          placeholder="관리자 비밀번호"
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
      </Container>
    </Wrapper>
  );
}

export default Login;

