import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/themes";

const TextBox = styled.div`
  cursor: pointer;
  width: 10rem;
  color: ${theme.Sub1};

  padding: 0 2.5rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;
  margin-bottom: 2.5rem;

  background-color: ${theme.Sub3};
`;

export default function Linkbox({ name, addr }) {
  const navigate = useNavigate();

  const handleLink = () => {
    navigate(addr);
  };

  return (
    <div>
      <Line />
      <TextBox onClick={handleLink}>{name}</TextBox>
    </div>
  );
}
