import styled from "styled-components";
import InfoSmall from "../../components/InfoSmall";
import cafe1 from "../../assets/cafe1.svg";
import CategoryBtn from "../../components/categoryBtn";
const Wrapper = styled.div`
  margin: 1rem;
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
      <CategoryBtn />
      <InfoSmall places={places} />
    </Wrapper>
  );
}
export default MyPlaceList;
