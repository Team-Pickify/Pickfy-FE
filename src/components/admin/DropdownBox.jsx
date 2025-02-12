import styled from "styled-components";
import { theme } from "../../styles/themes";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import DropdownOptions from "../DropdownOptions";
import { TokenReq } from "../../apis/axiosInstance";

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
  margin: 1.5rem;
  margin-right: 0;
  gap: 2rem;
`;

const Dropdown = styled.div`
  position: relative;
  cursor: pointer;
  width: 8rem;
  padding: 1vh 1.5vh;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  color: ${theme.Sub1};
  font-size: 0.8rem;

  border: 1px solid ${theme.Sub3};
  border-radius: 10vh;
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

export default function DropdownBox({ name, val, setVal }) {
  const [toggle, setToggle] = useState(false);
  const [options, setOptions] = useState([]);

  const getOptions = async () => {
    const opts = [];
    const opt = name === "매거진";
    const url = opt ? "/magazines" : "/categories";
    await TokenReq.get(url)
      .then((res) => res.data.result)
      .then((data) => {
        data.map((v) => {
          opts.push({ id: v.id, title: opt ? v.title : v.name });
        });
      });
    setOptions(opts);
  };

  useEffect(() => {
    const fetchData = () => {
      getOptions();
    };
    fetchData();
  }, [name]);

  const handleDropbox = () => {
    setToggle(!toggle);
  };

  return (
    <Container>
      <Line />
      <Box>
        <Name>{name}</Name>
        <Dropdown onClick={handleDropbox}>
          {val ? (
            options.find((v) => v.id === val)?.title
          ) : (
            <div>{name} 선택</div>
          )}
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
