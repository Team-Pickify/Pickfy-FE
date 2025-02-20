import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/themes";
import getCategorylist from "../hooks/mapApi/getCategorylist"; // ✅ API Hook 가져오기
import { TokenReq } from "../apis/axiosInstance";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Items = styled.button`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 600;
  height: 2.13rem;
  padding: 0.625rem 1.25rem;
  border-radius: 6.25rem;
  border: ${(props) => (props.isActive ? "none" : " 1px solid #e6e6e6")};
  background-color: ${(props) =>
    props.isActive ? theme.Text : "rgba(255, 255, 255, 0.7)"};
  color: ${(props) => (props.isActive ? "#ffffff" : "#000000")};
`;

function CategoryBtn({ onCategoryChange }) {
  const [categories, setCategories] = useState([]); // ✅ 카테고리 리스트 상태
  const [btnClick, setBtnClick] = useState(1); // ✅ 기본 선택값 (전체)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await TokenReq.get("/categories"); // ✅ GET 요청
        console.log("response: ", response);

        const data = await response.data.result;
        setCategories(data);
        if (data.some((item) => item.id === 1)) {
          setBtnClick(1); // ✅ ID가 1인 항목이 있으면 기본 선택
        } else if (data.length > 0) {
          setBtnClick(data[0].id); // ✅ 없으면 첫 번째 항목 선택
        }
      } catch (error) {
        console.error("❌ 카테고리 가져오기 에러:", error);
      }
    };
    fetchCategories();
  }, []);

  // ✅ 카테고리 상태 업데이트 확인용 로그
  useEffect(() => {
    console.log("✅ 업데이트된 카테고리 목록:", categories);
  }, [categories]);

  const handleClick = useCallback(
    (id) => {
      setBtnClick(id);
      const selectedCategory = categories.find(
        (category) => category.id === id
      );
      if (selectedCategory) {
        onCategoryChange(selectedCategory.name); // ✅ index.jsx로 카테고리 이름 전달
        console.log(`✅ 선택된 카테고리 이름: ${selectedCategory.name}`);
      }
      console.log(`🔘 선택한 카테고리 ID: ${id}`);
    },
    [categories, onCategoryChange]
  );
  return (
    <Wrapper>
      {categories.length > 0 ? (
        categories.map((item) => (
          <Items
            key={item.id}
            onClick={() => handleClick(item.id)}
            isActive={btnClick === item.id}
          >
            {item.name}
          </Items>
        ))
      ) : (
        <p>⏳ 카테고리 불러오는 중...</p> // ✅ 데이터 로딩 확인용
      )}
    </Wrapper>
  );
}

export default CategoryBtn;
