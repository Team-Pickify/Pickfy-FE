import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/themes";
import getCategorylist from "../hooks/mapApi/getCategorylist"; // ✅ API Hook 가져오기

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

function CategoryBtn() {
  const [categories, setCategories] = useState([]); // ✅ 카테고리 리스트 상태
  const [btnClick, setBtnClick] = useState(1); // ✅ 기본 선택값 (전체)

  useEffect(() => {
    getCategorylist(setBtnClick, setCategories);
  }, []);
  // ✅ categories 상태가 업데이트될 때마다 콘솔 찍기
  useEffect(() => {
    console.log("✅ 업데이트된 카테고리 목록:", categories);
  }, [categories]);
  const handleClick = (id) => {
    setBtnClick(id);
    console.log(`🔘 선택한 카테고리 ID: ${id}`);
  };
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
