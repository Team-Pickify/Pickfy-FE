import styled from "styled-components";
import Info from "./Info";
import cafe1 from "../assets/cafe1.svg";
const Imgcontainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.1875rem;
  margin: 0 0 1.5rem 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Img = styled.img`
  width: 6.75rem;
  height: 6.75rem;
  border-radius: 0.25rem;
`;
function InfoSmall() {
  return (
    <>
      <Info />
      <Imgcontainer>
        <Img src={cafe1}></Img>
        <Img src={cafe1}></Img>
        <Img src={cafe1}></Img>
        <Img src={cafe1}></Img>
      </Imgcontainer>
    </>
  );
}
export default InfoSmall;
