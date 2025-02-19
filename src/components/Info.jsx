import styled from "styled-components";
import { theme } from "../styles/themes";
import { IoShareSocialOutline } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ShareModal from "./modal/shareUrl";
import CheckMsg from "./toast/CheckMsg";
import Toast from "./toast/Toast";
import { TokenReq } from "../apis/axiosInstance";
import { toggleHeartAPI } from "../apis/placelist/heartToggle";

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.5rem;
`;
const TitleText = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.Text};
`;
const CategoryText = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #a6a6a6;
`;
const LineIntro = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #636363;
`;
const AdditionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1.375rem 0;
`;
const LinkContainer = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #a6a6a6;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6875rem;
`;
const LinkConnect = styled.a`
  display: flex;
  gap: 0.375rem;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-underline-position: from-font;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.62rem;
`;
const ShareButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.25rem;
  width: 1.25rem;
  color: ${theme.Sub3};
`;

function Info({
  name,
  categoryName,
  shortDescription,
  instagramLink,
  naverLink,
  placeId,
  isHeartFilled,
}) {
  const [isClicked, setIsClicked] = useState(isHeartFilled);
  // const handleClick = () => {
  //   setIsClicked(!isClicked);
  // };
  // ✅ 하트 클릭 핸들러
  const placeIdRef = useRef(placeId); // ✅ placeId를 ref에 저장

  useEffect(() => {
    placeIdRef.current = placeId; // ✅ placeId 변경 시 ref 업데이트
  }, [placeId]);

  const handleHeartClick = useCallback(async () => {
    try {
      const res = await toggleHeartAPI(placeIdRef.current); // ✅ ref를 통해 placeId 참조
      setIsClicked((prev) => !prev);
      handleToast(res.message || "하트 상태가 변경되었습니다! ❤️");
    } catch (error) {
      handleToast("하트 변경 중 문제가 발생했습니다. 😢");
      console.log("클릭한 id: ", placeIdRef.current);
    }
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ModalOpen = () => {
    setIsModalOpen(true);
  };
  const ModalClose = () => {
    setIsModalOpen(false);
  };
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");
  const handleToast = (msg) => {
    setMessage(<CheckMsg msg={msg} />);
    setToastVisible(true);
  };
  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <div style={center}>
        {toastVisible && (
          <Toast message={message} setToastVisible={setToastVisible} />
        )}
      </div>
      <InfoWrapper>
        <InfoLine>
          <TextContainer>
            <TitleText>{name}</TitleText>
            <CategoryText>{categoryName}</CategoryText>
          </TextContainer>
          <LineIntro>{shortDescription}</LineIntro>
          <AdditionContainer>
            <LinkContainer>
              <LinkConnect href={instagramLink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7 4.23077C6.4523 4.23077 5.9169 4.39318 5.4615 4.69747C5.0061 5.00176 4.65116 5.43425 4.44156 5.94026C4.23197 6.44627 4.17713 7.00307 4.28398 7.54025C4.39083 8.07743 4.65457 8.57086 5.04186 8.95814C5.42914 9.34543 5.92257 9.60917 6.45975 9.71602C6.99693 9.82287 7.55373 9.76803 8.05974 9.55844C8.56575 9.34884 8.99825 8.9939 9.30253 8.5385C9.60682 8.0831 9.76923 7.5477 9.76923 7C9.76847 6.26579 9.47647 5.56187 8.9573 5.0427C8.43813 4.52354 7.73421 4.23153 7 4.23077ZM7 8.84615C6.63487 8.84615 6.27793 8.73788 5.97433 8.53502C5.67073 8.33216 5.43411 8.04383 5.29438 7.70649C5.15465 7.36915 5.11809 6.99795 5.18932 6.63983C5.26055 6.28171 5.43638 5.95276 5.69457 5.69457C5.95276 5.43638 6.28171 5.26055 6.63983 5.18932C6.99795 5.11809 7.36915 5.15464 7.70649 5.29438C8.04383 5.43411 8.33216 5.67073 8.53502 5.97433C8.73788 6.27793 8.84615 6.63487 8.84615 7C8.84615 7.48963 8.65165 7.95921 8.30543 8.30543C7.95921 8.65165 7.48963 8.84615 7 8.84615ZM9.76923 1H4.23077C3.3742 1.00092 2.55297 1.34159 1.94728 1.94728C1.34159 2.55297 1.00092 3.3742 1 4.23077V9.76923C1.00092 10.6258 1.34159 11.447 1.94728 12.0527C2.55297 12.6584 3.3742 12.9991 4.23077 13H9.76923C10.6258 12.9991 11.447 12.6584 12.0527 12.0527C12.6584 11.447 12.9991 10.6258 13 9.76923V4.23077C12.9991 3.3742 12.6584 2.55297 12.0527 1.94728C11.447 1.34159 10.6258 1.00092 9.76923 1ZM12.0769 9.76923C12.0769 10.3813 11.8338 10.9682 11.401 11.401C10.9682 11.8338 10.3813 12.0769 9.76923 12.0769H4.23077C3.61873 12.0769 3.03176 11.8338 2.59898 11.401C2.16621 10.9682 1.92308 10.3813 1.92308 9.76923V4.23077C1.92308 3.61873 2.16621 3.03176 2.59898 2.59898C3.03176 2.16621 3.61873 1.92308 4.23077 1.92308H9.76923C10.3813 1.92308 10.9682 2.16621 11.401 2.59898C11.8338 3.03176 12.0769 3.61873 12.0769 4.23077V9.76923ZM10.6923 4C10.6923 4.13693 10.6517 4.27078 10.5756 4.38463C10.4996 4.49847 10.3914 4.58721 10.2649 4.63961C10.1384 4.69201 9.99923 4.70572 9.86494 4.67901C9.73064 4.65229 9.60729 4.58636 9.51047 4.48954C9.41364 4.39271 9.34771 4.26936 9.321 4.13506C9.29428 4.00077 9.30799 3.86157 9.36039 3.73507C9.41279 3.60856 9.50152 3.50044 9.61537 3.42437C9.72922 3.3483 9.86307 3.30769 10 3.30769C10.1836 3.30769 10.3597 3.38063 10.4895 3.51046C10.6194 3.6403 10.6923 3.81639 10.6923 4Z"
                    fill="#A6A6A6"
                  />
                </svg>
                인스타그램
              </LinkConnect>
              <LinkConnect href={naverLink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M5 11.7778L1.52667 12.8393C1.46649 12.8577 1.40239 12.8627 1.33967 12.854C1.27695 12.8452 1.21741 12.8229 1.16595 12.7888C1.1145 12.7548 1.07262 12.71 1.04376 12.6582C1.01491 12.6064 0.999908 12.5491 1 12.4909V3.48683C1.00002 3.40992 1.02642 3.33496 1.07547 3.27255C1.12453 3.21015 1.19374 3.16347 1.27333 3.13911L5 2M5 11.7778L9 13M5 11.7778V2M5 2L9 3.22222M9 13L12.7267 11.8615C12.8064 11.8371 12.8757 11.7903 12.9247 11.7278C12.9738 11.6653 13.0001 11.5902 13 11.5132V2.50844C13 2.45034 12.9849 2.39307 12.956 2.34135C12.9271 2.28963 12.8852 2.24495 12.8338 2.21099C12.7823 2.17703 12.7228 2.15476 12.6602 2.14602C12.5975 2.13728 12.5335 2.14232 12.4733 2.16072L9 3.22222M9 13V3.22222"
                    stroke="#A6A6A6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                네이버지도
              </LinkConnect>
            </LinkContainer>
            <ButtonContainer>
              <ShareButton onClick={ModalOpen}>
                <IoShareSocialOutline />
              </ShareButton>
              <ShareButton>
                {isClicked ? (
                  <FaHeart onClick={handleHeartClick} color="FF4B4B" />
                ) : (
                  <FaRegHeart onClick={handleHeartClick} />
                )}
              </ShareButton>
            </ButtonContainer>
          </AdditionContainer>
        </InfoLine>
      </InfoWrapper>
      {isModalOpen && (
        <ShareModal
          isOpen={ModalOpen}
          onClose={ModalClose}
          onToast={handleToast}
        />
      )}
    </>
  );
}
export default Info;
