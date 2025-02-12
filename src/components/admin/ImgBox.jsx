import styled from "styled-components";
import { theme } from "../../styles/themes";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 500;
`;

const Box = styled.div`
  display: flex;
  margin: 1.5rem 2rem;
  margin-right: 0;
  gap: 1rem;
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

const Greybox = styled.div`
  width: 20vh;
  height: 20vh;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1vh;
  background-color: ${theme.Sub3};
`;

const ImagePreview = styled.img`
  width: 20vh;
  height: 20vh;

  border-radius: 1vh;
`;

export default function ImgBox({ name, regId, register, img }) {
  const [image, setImage] = useState(img);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Container>
      <Line />
      <Box>
        <Name>{name}</Name>
        <input
          type="file"
          id="brandImage"
          accept="image/*"
          style={{ display: "none" }}
          {...register(regId, {
            onChange: (e) => handleFileChange(e),
          })}
        />

        <label htmlFor="brandImage">
          {image ? (
            <ImagePreview src={image} alt="preview" />
          ) : (
            <Greybox>
              <FaPlus color="white" size="1.5rem" />
            </Greybox>
          )}
        </label>
      </Box>
    </Container>
  );
}
