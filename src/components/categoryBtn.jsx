import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/themes";
import { TokenReq } from '../apis/axiosInstance';

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
  const [categories, setCategories] = useState([]);
  const [btnClick, setBtnClick] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await TokenReq.get("/categories");
        setCategories(response.data); // API 응답 데이터 저장
        if (response.data.length > 0) {
          setBtnClick(response.data[0].id); // 첫 번째 카테고리를 기본 선택
        }
      } catch (error) {
        console.error("카테고리 불러오기 실패: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (id) => {
    setBtnClick(id);
  };
  return (
    <Wrapper>
      {categories.map((item) => (
        <Items
          key={item.id}
          onClick={() => handleClick(item.id)}
          isActive={btnClick === item.id}
        >
          {item.name}
        </Items>
      ))}
    </Wrapper>
  );
}

export default CategoryBtn;
