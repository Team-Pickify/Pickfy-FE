import styled from "styled-components";
import WhiteLogo from "../../assets/Logo_White.svg";
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

  return (
    <Wrapper>
      <Container>
       <LogoBox 
        showIcon={true} 
        logoSrc={WhiteLogo}
        logoText="회원가입"/>
      </Container>
    </Wrapper>
  );
}

export default Login;

