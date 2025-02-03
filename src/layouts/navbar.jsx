import styled from "styled-components";
import logoImg from "../assets/logo.png";
import HeaderBtn from "../components/header/headerBtn";
import { useLocation } from "react-router-dom";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  height: 6.5rem;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;

  position: sticky;
  top: 0;
  z-index: 9999;
`;

const Logo = styled.div`
  background: url(${(props) => props.logo}) no-repeat;
  background-size: cover;
  width: 6rem;
  height: 2rem;
`;

export default function Navbar() {
  const location = useLocation().pathname.replace("/", "");

  return (
    <Header>
      <HeaderBtn pageLoc={location} pos="left" />
      <Logo logo={logoImg} />
      <HeaderBtn pageLoc={location} pos="right" />
    </Header>
  );
}
