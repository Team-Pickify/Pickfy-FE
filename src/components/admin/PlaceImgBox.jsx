import styled from "styled-components";
import { theme } from "../../styles/themes";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useEffect, useState } from "react";

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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  padding: 0 4rem;
`;

const Name = styled.div`
  font-weight: 500;
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
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

export default function PlaceImgBox({ images, setImages }) {
  const [addState, setAddState] = useState(true);

  useEffect(() => {
    setAddState(images.length < 5);
  }, [images]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImages((prevImages) => [...prevImages, file]);
      e.target.value = "";
    }
  };

  const handleDelImg = () => {
    setImages([]);
    setAddState(true);
  };

  return (
    <Container>
      <Line />
      <HeaderBox>
        <Name>이미지</Name>
        <RiDeleteBin2Line
          color={theme.Sub3}
          size="1.5rem"
          onClick={handleDelImg}
        />
      </HeaderBox>
      <Wrapper>
        {images.map((image, index) => (
          <Box key={index}>
            <ImagePreview
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt={`preview ${index + 1}`}
            />
          </Box>
        ))}
        {addState && (
          <Box>
            <input
              type="file"
              id={`brandImage`}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <label htmlFor={`brandImage`}>
              <Greybox>
                <FaPlus color="white" size="1.5rem" />
              </Greybox>
            </label>
          </Box>
        )}
      </Wrapper>
    </Container>
  );
}
