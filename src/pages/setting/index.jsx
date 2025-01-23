import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { theme } from "../../styles/themes";
import { HiMiniUser } from "react-icons/hi2";
import { LuPencilLine } from "react-icons/lu";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Line = styled.div`
  width: 100%;
  height: 0.05vh;

  background-color: ${theme.Sub3};
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2.5rem;
  margin-top: 2.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ImgBox = styled.div`
  background-color: ${theme.Sub3};
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

const ExistImgBox = styled.img`
  width: 100%;
  height: 100%;
  background-color: white;
  object-fit: cover;
`;

const GreyBox = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #00000069;
  position: absolute;
`;

const Username = styled.input`
  border: 0;
  background-color: transparent;
  width: 12rem;

  font-size: 1.4rem;
  font-weight: bold;

  &::placeholder {
    color: ${theme.Sub2};
    font-size: 1.1rem;
  }
  &:focus {
    outline: none;
  }
`;

const SettingText = styled.div`
  cursor: pointer;
  width: 10rem;
  color: ${theme.Sub1};

  padding: 0 2.5rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
function Setting() {
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState("");
  const [name, setName] = useState("username");
  const [toggle, setToggle] = useState(false);

  const handleImg = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImg(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const hanldeToggle = () => {
    setToggle(!toggle);
  };

  const goLogin = () => {
    navigate("/login");
    window.location.reload();
  };

  return (
    <Container>
      {/* 프로필 */}
      <ProfileBox>
        <UserInfo>
          <ImgBox>
            {/* 프로필 이미지 편집 요소 */}
            {toggle && (
              <GreyBox onClick={handleImg}>
                <FaPlus size="1.2rem" color="white" />
              </GreyBox>
            )}

            {/* 실제 프로필 이미지 요소 */}
            {profileImg ? (
              <ExistImgBox src={profileImg} alt="profileImg" />
            ) : (
              <HiMiniUser color="white" size="4.8rem" />
            )}
          </ImgBox>
          {/* 유저 이름 */}
          <Username
            value={name}
            disabled={!toggle}
            placeholder="한글/영문/숫자 최대 15자"
            onChange={handleName}
            style={toggle ? { borderBottom: `1px solid ${theme.Sub3}` } : {}}
          />
        </UserInfo>

        {/* 프로필편집 버튼 */}
        {toggle ? (
          <IoCheckmarkOutline
            color={theme.Sub3}
            size="1.7rem"
            onClick={hanldeToggle}
          />
        ) : (
          <LuPencilLine
            color={theme.Sub3}
            size="1.5rem"
            onClick={hanldeToggle}
          />
        )}
      </ProfileBox>

      <Line />

      {/* 로그아웃 */}
      <SettingText onClick={goLogin}>로그아웃</SettingText>

      <Line />

      {/* 회원탈퇴 */}
      <SettingText onClick={goLogin}>회원탈퇴</SettingText>
    </Container>
  );
}
export default Setting;
