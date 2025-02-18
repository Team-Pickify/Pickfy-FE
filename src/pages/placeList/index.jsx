import styled from "styled-components";
import InfoSmall from "../../components/InfoSmall";
import cafe1 from "../../assets/cafe1.svg";
import CategoryBtn from "../../components/categoryBtn";
import Carousel from "../../components/carousel/Carousel";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { theme } from "../../styles/themes";
import DropdownOptions from "../../components/DropdownOptions";
import { TokenReq } from "../../apis/axiosInstance";

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
const ListContainer = styled.div`
  padding: 0.5rem;
`;
function MyPlaceList() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]); // 카테고리 상태 추가
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태 추가

  const categoryoptions = ["전체", "매거진A", "매거진B", "매거진C", "매거진D"];
  const sortoptions = ["최신순", "좋아요순"];

  const [selectedSort, setSelectedSort] = useState("최신순");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const fetchPlaces = async () => {
    try {
      const response = await TokenReq.get("/places", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      // 데이터가 성공적으로 왔을 때, 상태에 저장
      if (response && response.data) {
        setPlaces(response.data.result); // 받은 데이터를 상태에 저장
      } else {
        console.log("응답 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await TokenReq.get("/categories");
      if (response.data.length > 0) {
        setCategories(response.data);
        setSelectedCategory(response.data[0].id); // 첫 번째 카테고리를 기본 선택
      }
    } catch (error) {
      console.error("카테고리 불러오기 실패: ", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
    fetchCategories();
  }, []);

  return (
    <Wrapper>
      <CarouselWrapper>
        <Carousel />
        <ButtonWrapper>
          <CategoryBtn
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={setSelectedCategory} // 선택 변경 함수 전달
          />
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
        <ListContainer>
          <InfoSmall places={places} />
        </ListContainer>
      </Container>
    </Wrapper>
  );
}
export default MyPlaceList;
