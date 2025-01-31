import styled from "styled-components";
import { theme } from "../styles/themes";

const OptionBox = styled.div`
  width: 15vh;
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

export default function DropboxOptions({ setVal, options }) {
  const handleOpt = (opt) => {
    setVal(opt);
  };

  return (
    <div>
      <OptionBox>
        {options.map((v, idx) => {
          return (
            <Option key={v + idx} onClick={() => handleOpt(v)}>
              {v}
            </Option>
          );
        })}
      </OptionBox>
    </div>
  );
}
