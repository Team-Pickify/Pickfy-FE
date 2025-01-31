import { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/themes";

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

const category = [
  { id: 1, name: "전체" },
  { id: 2, name: "음식점" },
  { id: 3, name: "카페/베이커리" },
  { id: 4, name: "바/펍" },
  { id: 5, name: "도서/문구" },
];

function CategoryBtn() {
  const [btnClick, setBtnClick] = useState(1);
  const handleClick = (id) => {
    setBtnClick(id);
  };
  return (
    <Wrapper>
      {category.map((item) => (
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
