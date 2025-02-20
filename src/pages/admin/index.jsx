import styled from "styled-components";
import logoImg from "../../../public/assets/logo.png";
import Linkbox from "../../components/Linkbox";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styles/themes";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  height: 6.5rem;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;

  position: sticky;
`;

const Btn = styled.div`
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  background: url(${(props) => props.logo}) no-repeat;
  background-size: cover;
  width: 6rem;
  height: 2rem;
`;

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div>
      <Header>
        <Btn onClick={() => navigate(-1)}>
          <GoArrowLeft size={28} color={theme.Sub1} />
        </Btn>
        <Logo logo={logoImg} />
        <Btn></Btn>
      </Header>
      <Linkbox name="매거진 관리" addr="/admin/magazine-management" />
      <Linkbox name="플레이스 관리" addr="/admin/place-management" />
    </div>
  );
}
