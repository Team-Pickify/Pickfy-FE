import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/themes";

const TextBox = styled.div`
  cursor: pointer;
  width: 15rem;
  color: ${theme.Sub1};

  margin: 3vh 0;
  padding: 0 2.5rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

const blackTextList = ["magazine-management", "place-management"];

export default function Linkbox({ name, addr }) {
  const navigate = useNavigate();
  const bk = blackTextList.includes(location.pathname.split("/")[2]);

  const handleLink = () => {
    navigate(addr);
  };

  return (
    <div>
      <Line />
      {bk ? (
        <TextBox style={{ color: "black" }} onClick={handleLink}>
          {name}
        </TextBox>
      ) : (
        <TextBox onClick={handleLink}>{name}</TextBox>
      )}
    </div>
  );
}
