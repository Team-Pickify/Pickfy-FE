import styled from "styled-components";
import { theme } from "../../styles/themes";
import { useState } from "react";
import { AddressSearch } from "../../hooks/useMapInfo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 500;
  width: 4rem;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 2rem;
  gap: 1rem;
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

const InputBox = styled.input`
  all: unset;
  width: 35rem;

  &::placeholder {
    color: ${theme.Sub2};
  }
`;

export default function AddressBox({ name, regId, register }) {
  const [address, setAddress] = useState("");

  const handleAddress = () => {
    AddressSearch((selectedAddress) => {
      setAddress(selectedAddress);
    });
  };

  return (
    <Container>
      <Line />
      <Box>
        <Name>{name}</Name>
        <InputBox
          value={address}
          placeholder={`${name} 입력`}
          type="text"
          readOnly
          onClick={handleAddress}
          {...register(regId)}
        />
      </Box>
    </Container>
  );
}
