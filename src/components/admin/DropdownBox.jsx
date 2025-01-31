import styled from "styled-components";
import { theme } from "../../styles/themes";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import DropdownOptions from "../DropdownOptions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 500;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 2rem;
  margin-right: 0;
  gap: 2rem;
`;

const Dropdown = styled.div`
  position: relative;
  cursor: pointer;
  width: 15vh;

  padding: 1vh 1.5vh;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  color: ${theme.Sub1};
  font-size: 0.9rem;

  border: 1px solid ${theme.Sub3};
  border-radius: 10vh;
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

export default function DropdownBox({ register, name, kind, options }) {
  const [toggle, setToggle] = useState(false);
  const [val, setVal] = useState(kind);

  const handleDropbox = () => {
    setToggle(!toggle);
  };

  return (
    <Container>
      <Line />
      <Box>
        <Name>{name}</Name>
        <Dropdown onClick={handleDropbox}>
          <div>{val}</div>
          {toggle ? (
            <IoIosArrowUp color={theme.Sub1} size="1rem" />
          ) : (
            <IoIosArrowDown color={theme.Sub1} size="1rem" />
          )}
          {toggle && (
            <DropdownOptions setVal={setVal} options={options} wd="15vh" />
          )}
        </Dropdown>
      </Box>
    </Container>
  );
}
