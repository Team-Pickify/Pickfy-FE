import styled from "styled-components";
import InfoSmall from "../../components/InfoSmall";
import CategoryBtn from "../../components/categoryBtn";
import Carousel from "../../components/carousel/Carousel";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState, useCallback } from "react";
import { theme } from "../../styles/themes";
import DropdownOptions from "../../components/DropdownOptions";
import { TokenReq } from "../../apis/axiosInstance";
import getMagazinelist from "../../hooks/mapApi/getMagazinelist";

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
  top: calc(100% + 0.5rem); /* 선택된 아이템 바로 아래에 위치 */
  left: -2rem;
  background-color: #ffffff;
  border: 1px solid ${theme.Sub2};
  border-radius: 0.5rem;
  z-index: 99;
  width: 6rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Option = styled.div`
  padding: 0.5rem;
  text-align: center;
  border-bottom: 1px solid ${theme.Sub2};

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: ${theme.Sub3};
    cursor: pointer;
  }
`;
const ListContainer = styled.div`
  padding: 0.5rem;
`;

function MyPlaceList() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]); // ✅ 필터링된 장소 목록 상태
  const [selectedCategory, setSelectedCategory] = useState("전체"); // ✅ 선택된 카테고리 이름 상태

  const [magazineOptions, setMagazineOptions] = useState([]);
  const sortoptions = ["최신순", "좋아요순"];

  const [selectedMagazine, setSelectedMagazine] = useState("전체");
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [magazineOpen, setMagazineOpen] = useState(false);
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
        // const updatedPlaces = response.data.result.map((place) => ({
        //   ...place,
        //   isHeartFilled: true,
        // }));
        //setPlaces(response.data.result); // 받은 데이터를 상태에 저장
        setPlaces(response.data.result);
      } else {
        console.log("응답 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };
  const fetchMagazineList = async () => {
    try {
      const response = await TokenReq.get("/magazines");
      if (response && response.data) {
        const titles = response.data.result.map((magazine) => magazine.title);
        setMagazineOptions(["전체", ...titles]); // "전체" 옵션 추가
      } else {
        console.log("카테고리 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("카테고리 데이터 요청 오류:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
    fetchMagazineList();
  }, []);

  const filterAndSortPlaces = useCallback(() => {
    let filtered = places;

    if (selectedCategory !== "전체") {
      filtered = filtered.filter(
        (place) => place.categoryName === selectedCategory
      );
    }

    if (selectedMagazine !== "전체") {
      filtered = filtered.filter(
        (place) => place.magazineTitle === selectedMagazine
      );
    }

    if (selectedSort === "최신순") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (selectedSort === "좋아요순") {
      filtered.sort((a, b) => b.likeCount - a.likeCount);
    }

    setFilteredPlaces(filtered);
  }, [places, selectedCategory, selectedMagazine, selectedSort]);

  useEffect(() => {
    filterAndSortPlaces();
  }, [filterAndSortPlaces]);

  // places 상태가 변경될 때 filteredPlaces 상태도 업데이트
  useEffect(() => {
    setFilteredPlaces(places);
  }, [places]);

  const handleMagazineChange = (option) => {
    setSelectedMagazine(option);
    setMagazineOpen(false); // 선택한 후 드롭다운 닫기
    if (option === "전체") {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter((place) => place.magazineTitle === option);
      setFilteredPlaces(filtered);
    }
  };

  const handleSortChange = (option) => {
    setSelectedSort(option);
    setSortOpen(false); // 선택한 후 드롭다운 닫기
  };

  // Info 에서 삭제된 장소를 제외하고 렌더링
  const handleRemovePlace = (placeId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.placeId !== placeId)
    );
    setFilteredPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.placeId !== placeId)
    ); // ✅ 필터링된 장소 목록에서도 제거
  };
  const handleCategoryChange = useCallback(
    (categoryName) => {
      setSelectedCategory(categoryName);
      if (categoryName === "전체") {
        setFilteredPlaces(places); // "전체" 선택 시 전체 장소 목록 보여주기
      } else {
        const filtered = places.filter(
          (place) => place.categoryName === categoryName
        );
        setFilteredPlaces(filtered);
      }
    },
    [places]
  );
  return (
    <Wrapper>
      <CarouselWrapper>
        <Carousel />
        <ButtonWrapper>
          <CategoryBtn onCategoryChange={handleCategoryChange} />
        </ButtonWrapper>
      </CarouselWrapper>
      <Container>
        <DrowdownContainer>
          <SelectedItem onClick={() => setMagazineOpen(!magazineOpen)}>
            {selectedMagazine}
            {magazineOpen ? (
              <IoIosArrowUp size="1rem" />
            ) : (
              <IoIosArrowDown size="1rem" />
            )}
            {magazineOpen && (
              <DropdownWrapper>
                {magazineOptions.map((option, index) => (
                  <Option
                    key={index}
                    onClick={() => handleMagazineChange(option)}
                  >
                    {option}
                  </Option>
                ))}
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
                {sortoptions.map((option, index) => (
                  <Option key={index} onClick={() => handleSortChange(option)}>
                    {option}
                  </Option>
                ))}
              </DropdownWrapper>
            )}
          </SelectedItem>
        </DrowdownContainer>
        <ListContainer>
          <InfoSmall
            places={filteredPlaces}
            initialHeartState={true}
            onRemovePlace={handleRemovePlace}
          />
        </ListContainer>
      </Container>
    </Wrapper>
  );
}
export default MyPlaceList;
