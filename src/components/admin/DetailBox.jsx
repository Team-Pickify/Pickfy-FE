import styled from "styled-components";
import { theme } from "../../styles/themes";

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

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

const InputBox = styled.input`
  all: unset;
  width: 15rem;

  &::placeholder {
    color: ${theme.Sub2};
  }
`;

export default function DetailBox({ register, name }) {
  return (
    <Container>
      <Line />
      <Box>
        <Name>{name}</Name>
        <InputBox
          placeholder={`${name} 입력`}
          type="text"
          {...register(name)}
        />
      </Box>
    </Container>
  );
}
