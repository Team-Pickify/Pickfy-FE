import styled from "styled-components";
import logoImg from "../assets/logo.png";
import HeaderBtn from "../components/header/headerBtn";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  height: 6.5rem;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
`;

const Logo = styled.div`
  background: url(${(props) => props.logo}) no-repeat;
  background-size: cover;
  width: 6rem;
  height: 2rem;
`;

export default function Navbar() {
  return (
    <Header>
      <HeaderBtn pageLoc="myplacelist" pos="left" />
      <Logo logo={logoImg} />
      <HeaderBtn pageLoc="myplacelist" pos="right" />
    </Header>
  );
}
