import { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/themes";

const Wrapper = styled.div`
  z-index:10;
  position:absolute;
  top:10%;
  display: flex;
  flex-direction: row;
  margin: 1.19rem 0;
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
  background-color: ${(props) => (props.isActive ? theme.Text : "#ffffff")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#000000")};
`;
const category = [
  { id: 1, name: "전체" },
  { id: 2, name: "음식점" },
  { id: 3, name: "카페/베이커리" },
  { id: 4, name: "바/펍" },
  { id: 5, name: "도서/문구" },
];
function CategoryBtn({btnClick,setBtnClick,mapCurLocation_toMark,container}) {

  const handleClick = (id) => {
    const newarr = btnClick.map((v,i)=>{
      if(i == id){
        return (v ? 0 : 1)
      }
      else{
        return v
      }
     })
     setBtnClick(newarr)
    console.log(newarr)
     mapCurLocation_toMark(newarr);

  };
  return (
    <Wrapper>
      {category.map((item) => (
        <Items
          key={item.id}
          onClick={() => handleClick(item.id)}
          isActive={btnClick[item.id] === 1}
        >
          {item.name}
        </Items>
      ))}
    </Wrapper>
  );
}
export default CategoryBtn;
