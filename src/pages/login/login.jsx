import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginBtn from "../../components/LoginBtn";
import InputBox from "../../components/InputBox";
import WhiteLogo from "../../assets/whiteLogo.png";
import KakaoLogo from "../../assets/Kakao_Logo.svg";
import LogoBox from "../../components/LogoBox";
import { theme } from "../../styles/themes";
import { TokenReq } from "../../apis/axiosInstance";

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
  width: 100%;
  background: ${theme.Sub1};
`;

const Text = styled.span`
  width: 1.875rem;
  height: 0.8125rem;
  color: ${theme.Sub1};
  font-size: 0.625rem;
  text-align: center;
`;

const LinkCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  margin-top: 1.37rem;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${theme.Sub1};
  font-size: 0.875rem;
  font-weight: 400;
  display: inline-block;

  &:visited {
    color: ${theme.Sub1};
  }

  &:active {
    color: ${theme.Sub2};
  }
`;

const Divider = styled.span`
  color: ${theme.Sub1};
  margin: 0 0.5rem;
  font-size: 0.875rem;
`;

function Login() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isButtonEnabled = email.trim() !== "" && password.trim() !== "";

  const navigate = useNavigate();
  const handleLogin = async () => {
    if (isButtonEnabled) {
      try {
        await TokenReq.post("/auth/login", {
          principal: email,
          password,
        }).then(() => {
          TokenReq.post("/auth/me")
            .then((res) => res.data)
            .then((data) => {
              console.log("체크:", data);
              if (data.result) navigate("/");
              else console.log("로그인 실패");
            });
        });
      } catch (error) {
        console.log("로그인 에러: ", error);
      }
    }
  };

  const KakaoBtnClick = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    window.location.href = `${baseURL}auth/oauth2/kakao`;
  };

  return (
    <Wrapper>
      <Container>
        <LogoBox
          showIcon={false}
          logoSrc={WhiteLogo}
          logoText="내 주변 트렌디한 매거진 플레이스"
        />
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
          isIcon={true}
          iconType={isPasswordVisible ? "eye" : "eye-off"}
          onIconClick={() => setPasswordVisible(!isPasswordVisible)}
        />
        <LoginBtn
          text="Login"
          isActive={isButtonEnabled}
          onClick={handleLogin}
        />
        <DividerContainer>
          <Line />
          <Text>or</Text>
          <Line />
        </DividerContainer>
        <LoginBtn
          text="Kakao Login"
          bgColor={theme.KakaoYellow}
          textColor={theme.KakaoBrown}
          borderColor={theme.KakaoYellow}
          imageSrc={KakaoLogo}
          onClick={KakaoBtnClick}
        />
        <LinkCon>
          <div>
            <StyledLink to="/signup">회원가입</StyledLink>
            <Divider>/</Divider>
            <StyledLink to="/repassword">비밀번호 찾기</StyledLink>
          </div>
          <StyledLink to="/adminlogin">관리자 로그인</StyledLink>
        </LinkCon>
      </Container>
    </Wrapper>
  );
}

export default Login;
