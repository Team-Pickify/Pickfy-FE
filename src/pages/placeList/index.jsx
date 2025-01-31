import styled from "styled-components";
import InfoSmall from "../../components/InfoSmall";
import cafe1 from "../../assets/cafe1.svg";
import CategoryBtn from "../../components/categoryBtn";
import Carousel from "../../components/carousel/Carousel";

const Wrapper = styled.div`
  height: auto;
  background-color: #ffffff;
`;
const Container = styled.div`
  margin: 1rem;
`;
const CarouselWrapper = styled.div`
  position: relative;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  top: 1.19rem;
  margin-left: 0.94rem;
  z-index: 10;
`;
function MyPlaceList() {
  const places = [
    {
      id: 1,
      name: "플레이스명",
      category: "카테고리명",
      short_description: "한줄소개",
      instagram_link: "https://www.instagram.com",
      naverplace_link: "https://www.naver.com",
      images: [
        { id: 1, url: cafe1 },
        { id: 2, url: cafe1 },
        { id: 3, url: cafe1 },
        { id: 4, url: cafe1 },
      ],
    },
    {
      id: 2,
      name: "플레이스명",
      category: "카테고리명",
      short_description: "한줄소개",
      instagram_link: "https://www.instagram.com",
      naverplace_link: "https://www.naver.com",
      images: [
        { id: 1, url: cafe1 },
        { id: 2, url: cafe1 },
        { id: 3, url: cafe1 },
        { id: 4, url: cafe1 },
      ],
    },
  ];

  return (
    <Wrapper>
      <CarouselWrapper>
        <Carousel />
        <ButtonWrapper>
          <CategoryBtn />
        </ButtonWrapper>
      </CarouselWrapper>
      <Container>
        <InfoSmall places={places} />
      </Container>
    </Wrapper>
  );
}
export default MyPlaceList;
