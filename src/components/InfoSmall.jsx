import styled from "styled-components";
import Info from "./Info";

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
function InfoSmall({ places, initialHeartState, onRemovePlace }) {
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
            placeId={place.placeId}
            initialHeartState={initialHeartState}
            onRemovePlace={onRemovePlace}
          />
          <Imgcontainer>
            {place.placeImageUrl?.map((image, index) => (
              <Img key={index} src={image} alt={`${place.name} 이미지`} />
            ))}
          </Imgcontainer>
        </div>
      ))}
    </>
  );
}
export default InfoSmall;
