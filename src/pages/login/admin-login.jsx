import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import LoginBtn from "../../components/LoginBtn";
import InputBox from "../../components/InputBox";
import WhiteLogo from "../../assets/Logo_White.svg";
import LogoBox from "../../components/LogoBox";
import {theme} from "../../styles/themes";
import { TokenReq } from "../../apis/axiosInstance";
import { Cookies, useCookies } from "react-cookie";

const Wrapper = styled.div`
  background-color: ${theme.Text};
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
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isButtonEnabled = email.trim() !== "" && password.trim() !== "";

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const handleLogin = async () => {
    if (isButtonEnabled) {
      try {
        const response = await TokenReq.post("/auth/login", {
          principal: email,
          password,
        });
        console.log("🔍 전체 응답 객체:", response);

        if (response.status === 200 && response.data.role === "ADMIN") {
          //const accessToken = response.headers["authorization"];
          const accessToken = response.headers.authorization?.split(" ")[1];
          console.log("access token: ", accessToken);
          console.log(response.headers.authorization);
          setCookies("accessToken", accessToken, { path: "/" });
          setCookies("userRole", response.data.role, { path: "/" });
          TokenReq.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          console.log("✅ Refresh Token:", cookies["refreshToken"]);
        }

        navigate("/admin");
        console.log("응답 헤더:", response);
      } catch (error) {
        console.log("로그인 에러: ", error);
      }
    }
  };

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
          isIcon={true} 
          iconType={isPasswordVisible ? "eye" : "eye-off"}
          onIconClick={() => setPasswordVisible(!isPasswordVisible)}
        />
        <LoginBtn
          text="Login"
          isActive={isButtonEnabled}
          onClick={handleLogin}
        />
      </Container>
    </Wrapper>
  );
}

export default Login;

