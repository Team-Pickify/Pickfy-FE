import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoArrowLeft } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { theme } from "../../../styles/themes";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  height: 6.5rem;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Btn = styled.div`
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ManagePlace() {
  const navigate = useNavigate();
  const handleNav = (address) => navigate(address);

  return (
    <Header>
      <Btn onClick={() => handleNav(-1)}>
        <GoArrowLeft size={28} color={theme.Sub1} />
      </Btn>
      <Title>플레이스 관리</Title>
      <Btn onClick={() => handleNav("/admin/magazine-management/add")}>
        <GoPlus size={28} color={theme.Sub1} />
      </Btn>
    </Header>
  );
}
