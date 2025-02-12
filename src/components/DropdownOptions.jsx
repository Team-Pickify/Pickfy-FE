import styled from "styled-components";
import { theme } from "../styles/themes";

const OptionBox = styled.div`
  width: ${(props) => props.wd || "15vh"};
  padding: 1vh 0;

  background-color: white;
  border: 1px solid ${theme.Sub3};
  border-radius: 2vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 3rem;
  left: 0rem;
  z-index: 99;
`;

const Option = styled.div`
  width: 80%;
  text-align: center;
  padding: 0.5vh 0;

  border-bottom: 1px solid ${theme.Sub2};

  &:last-child {
    border: 0;
  }
`;

export default function DropdownOptions({ setVal, options, wd }) {
  const handleOpt = (opt) => {
    setVal(opt);
  };

  return (
    <div>
      <OptionBox wd={wd}>
        {options.map((v) => {
          return (
            <Option key={v.id} onClick={() => handleOpt(v.id)}>
              {v.title}
            </Option>
          );
        })}
      </OptionBox>
    </div>
  );
}
