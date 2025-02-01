import styled from "styled-components";
import InfoSmall from "../../components/InfoSmall";
import cafe1 from "../../assets/cafe1.svg";
import CategoryBtn from "../../components/categoryBtn";
import Carousel from "../../components/carousel/Carousel";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { theme } from "../../styles/themes";
import DropdownOptions from "../../components/DropdownOptions";

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
const DrowdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.62rem;
  margin-top: 1.19rem;
  color: ${theme.Sub1};
  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 600;
`;
const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  margin-top: -3rem;
  left: -2rem; /* 끝나는 지점을 SelectedItem과 맞춤 */
  z-index: 99;
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
  const categoryoptions = ["전체", "매거진A", "매거진B", "매거진C", "매거진D"];
  const sortoptions = ["최신순", "좋아요순"];

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <Wrapper>
      <CarouselWrapper>
        <Carousel />
        <ButtonWrapper>
          <CategoryBtn />
        </ButtonWrapper>
      </CarouselWrapper>
      <Container>
        <DrowdownContainer>
          <SelectedItem onClick={() => setCategoryOpen(!categoryOpen)}>
            {selectedCategory}
            {categoryOpen ? (
              <IoIosArrowUp size="1rem" />
            ) : (
              <IoIosArrowDown size="1rem" />
            )}
            {categoryOpen && (
              <DropdownWrapper>
                <DropdownOptions
                  setVal={(val) => {
                    setSelectedCategory(val);
                    setCategoryOpen(false);
                  }}
                  options={categoryoptions}
                  wd="6rem"
                />
              </DropdownWrapper>
            )}
          </SelectedItem>

          <SelectedItem onClick={() => setSortOpen(!sortOpen)}>
            {selectedSort}
            {sortOpen ? (
              <IoIosArrowUp size="1rem" />
            ) : (
              <IoIosArrowDown size="1rem" />
            )}
            {sortOpen && (
              <DropdownWrapper>
                <DropdownOptions
                  setVal={(val) => {
                    setSelectedSort(val);
                    setSortOpen(false);
                  }}
                  options={sortoptions}
                  wd="6rem"
                />
              </DropdownWrapper>
            )}
          </SelectedItem>
        </DrowdownContainer>
        <InfoSmall places={places} />
      </Container>
    </Wrapper>
  );
}
export default MyPlaceList;
