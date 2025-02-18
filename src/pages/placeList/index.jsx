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
  const [magazines, setMagazines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // 추가

  const sortoptions = ["최신순", "좋아요순"];
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [magazinesOpen, setMagazinesOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // ✅ API 요청 함수 (장소 데이터 불러오기)
  const fetchPlaces = async () => {
    try {
      const response = await TokenReq.get("/places", {
        headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
      });

      if (response?.data) {
        let placeData = response.data.result;
        if (selectedSort === "좋아요순") {
          placeData.sort((a, b) => b.likeCount - a.likeCount);
        } else {
          placeData.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
        }
        setPlaces(placeData);
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };

  // ✅ API 요청 함수 (매거진 & 카테고리 불러오기)
  const fetchData = async () => {
    try {
      const [magazineRes, categoryRes] = await Promise.all([
        TokenReq.get("/magazines"),
        TokenReq.get("/categories"),
      ]);

      if (magazineRes.data.length > 0) {
        setMagazines(magazineRes.data);
        setSelectedMagazine(magazineRes.data[0].id); // 기본값 설정
      }

      if (categoryRes.data.length > 0) {
        setCategories(categoryRes.data);
        setSelectedCategory(categoryRes.data[0].id); // 기본값 설정
      }
    } catch (error) {
      console.error("데이터 불러오기 실패: ", error);
    }
  };

  // ✅ useEffect: 컴포넌트가 마운트될 때 데이터 불러오기
  useEffect(() => {
    fetchPlaces();
    fetchData();
  }, [selectedMagazine, selectedSort]); // 의존성 배열 수정

  return (
    <Wrapper>
      <CarouselWrapper>
        <Carousel />
        <ButtonWrapper>
          <CategoryBtn
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={setSelectedCategory}
          />
        </ButtonWrapper>
      </CarouselWrapper>
      <Container>
        <DrowdownContainer>
          {/* 매거진 선택 드롭다운 */}
          <SelectedItem onClick={() => setMagazinesOpen(!magazinesOpen)}>
            {magazines.find((m) => m.id === selectedMagazine)?.title || "전체"}
            {magazinesOpen ? (
              <IoIosArrowUp size="1rem" />
            ) : (
              <IoIosArrowDown size="1rem" />
            )}
            {magazinesOpen && (
              <DropdownWrapper>
                <DropdownOptions
                  setVal={(id) => {
                    setSelectedMagazine(id);
                    setMagazinesOpen(false);
                  }}
                  options={magazines.map((m) => ({
                    value: m.id,
                    label: m.title,
                  }))}
                  wd="6rem"
                />
              </DropdownWrapper>
            )}
          </SelectedItem>

          {/* 정렬 기준 선택 드롭다운 */}
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
                  options={sortoptions.map((opt) => ({
                    value: opt,
                    label: opt,
                  }))}
                  wd="6rem"
                />
              </DropdownWrapper>
            )}
          </SelectedItem>
        </DrowdownContainer>

        {/* 장소 리스트 */}
        <ListContainer>
          <InfoSmall places={places} />
        </ListContainer>
      </Container>
    </Wrapper>
  );
}

export default MyPlaceList;
