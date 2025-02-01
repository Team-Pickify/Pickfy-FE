import styled from "styled-components";
import { theme } from "../../styles/themes";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 3vh;
  background-color: white;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 3vh;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Name = styled.div`
  font-weight: 500;
`;

const Box = styled.div`
  display: flex;
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

const Greybox = styled.div`
  width: 18vh;
  height: 18vh;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1vh;
  background-color: ${theme.Sub3};
`;

const ImagePreview = styled.img`
  width: 18vh;
  height: 18vh;

  border-radius: 1vh;
`;

export default function PlaceImgBox({ register, name }) {
  const [images, setImages] = useState(Array(6).fill(null));

  const handleFileChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  return (
    <Container>
      <Line />
      <HeaderBox>
        <Name>{name}</Name>
        <RiDeleteBin2Line color={theme.Sub3} size="1.5rem" />
      </HeaderBox>
      <Wrapper>
        {images.map((image, index) => (
          <Box key={image + index}>
            <input
              type="file"
              id={`brandImage${index}`}
              accept="image/*"
              style={{ display: "none" }}
              {...register(`${name}[${index}]`, {
                required: "이미지는 필수입니다.",
                onChange: handleFileChange(index),
              })}
            />

            <label htmlFor={`brandImage${index}`}>
              {image ? (
                <ImagePreview src={image} alt={`preview ${index + 1}`} />
              ) : (
                <Greybox>
                  <FaPlus color="white" size="1.5rem" />
                </Greybox>
              )}
            </label>
          </Box>
        ))}
      </Wrapper>
    </Container>
  );
}
