import styled from "styled-components";
import { theme } from "../../styles/themes";
import { FaXmark } from "react-icons/fa6";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  cursor: pointer;

  width: 6rem;
  margin: 1.5rem 2rem;
  padding: 0.5vh 1vh;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  color: ${theme.Sub3};
  font-size: 0.8rem;

  border: 1px solid ${theme.Sub3};
  border-radius: 10vh;
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

export default function DeleteBtn() {
  return (
    <Container>
      <Line />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Box>
          <div>삭제하기</div>
          <FaXmark color={theme.Sub3} size={12} />
        </Box>
      </div>
    </Container>
  );
}
