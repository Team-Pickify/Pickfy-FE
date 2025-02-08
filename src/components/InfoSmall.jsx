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
function InfoSmall({ places }) {
  console.log(places);
  return (
    <>
      {places?.map((place) => (
        <div key={place.placeId}>
          <Info
            name={place.name}
            categoryName={place.categoryName}
            shortDescription={place.shortDescription}
            instagramLink={place.instagramLink}
            naverLink={place.naverLink}
          />
          <Imgcontainer>
            {place.placeImageUrl?.map((image) => (
              <Img
                key={image.placeId}
                src={image.placeImageUrl}
                alt={`${place.name} 이미지`}
              />
            ))}
          </Imgcontainer>
        </div>
      ))}
    </>
  );
}
export default InfoSmall;
