import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cafe1 from "../../assets/cafe1.png";
import cafe2 from "../../assets/cafe2.png";
import cafe3 from "../../assets/cafe3.png";
import cafe4 from "../../assets/cafe4.png";
import cafe5 from "../../assets/cafe5.png";
import { theme } from "../../styles/themes";

const images = [cafe1, cafe2, cafe3, cafe4, cafe5]; // 이미지 배열

const CarouselContainer = styled.div`
  width: 100%;
  height: 23.44rem;
  overflow: hidden;
  position: relative;
  @media (max-height: 800px) {
    height: 40vh;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.translateX}%);
  position: relative;
  height: 100%;
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -0.81rem; // 이미지를 겹치게 하기 위해 margin-top을 음수로 설정
  position: absolute;
  width: 100%;
  transform: translateY(-50%);
  z-index: 10;
`;

const Dot = styled.div`
  width: 0.3125rem;
  height: 0.3125rem;
  margin: 0 0.25rem;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "white" : `${theme.Sub3}`)};
  transition: background-color 0.3s;
`;

function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CarouselContainer>
        <CarouselTrack translateX={-index * 100}>
          {images.slice(0, 5).map((img, i) => (
            <Slide key={i} src={img} alt={`Slide ${i}`} />
          ))}
        </CarouselTrack>
        <Dots>
          {images.map((_, i) => (
            <Dot key={i} active={i === index} />
          ))}
        </Dots>
      </CarouselContainer>
    </>
  );
}

export default Carousel;
