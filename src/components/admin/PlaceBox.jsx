import styled from "styled-components";
import { theme } from "../../styles/themes";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  margin: 3vh 0;
  padding: 0 0 0 1.5rem;
`;

const DetailBox = styled.div`
  width: 6rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 500;
`;

const Address = styled.div`
  color: ${theme.Sub3};
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

export default function PlaceBox({ name, addr }) {
  return (
    <div>
      <Line />
      <Container>
        <DetailBox>
          <Name>{name}</Name>
        </DetailBox>
        <Address>{addr}</Address>
      </Container>
    </div>
  );
}
