import styled from "styled-components";
import logoImg from "../../assets/logo.png";
import Linkbox from "../../components/Linkbox";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  height: 6.5rem;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;

  position: sticky;
`;

const Logo = styled.div`
  background: url(${(props) => props.logo}) no-repeat;
  background-size: cover;
  width: 6rem;
  height: 2rem;
`;

export default function Admin() {
  return (
    <div>
      <Header>
        <Logo logo={logoImg} />
      </Header>
      <Linkbox name="매거진 관리" addr="/admin/magazine-management" />
      <Linkbox name="플레이스 관리" addr="/admin/place-management" />
    </div>
  );
}
