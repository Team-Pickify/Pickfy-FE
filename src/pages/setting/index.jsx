import styled from "styled-components";
import { useState, useEffect } from "react";
import Toast from "../../components/toast/Toast";
import CheckMsg from "../../components/toast/CheckMsg";
import { theme } from "../../styles/themes";
import { HiMiniUser } from "react-icons/hi2";
import { LuPencilLine } from "react-icons/lu";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Linkbox from "../../components/Linkbox";
import { TokenReq } from "../../apis/axiosInstance";
import { useCookies } from "react-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 2.5rem;
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

  background-color: #37373769;
  position: absolute;
`;

const Username = styled.input`
  width: 45vw;
  @media screen and (min-width: 600px) {
    width: 22rem;
  }

  border: 0;
  background-color: transparent;

  font-size: 1.4rem;
  font-weight: bold;

  &::placeholder {
    color: ${theme.Sub2};
    font-size: 1rem;
  }
  &:focus {
    outline: none;
  }
`;

function Setting() {
  const [profileImg, setProfileImg] = useState(""); // 프로필 이미지 상태
  const [subImg, setSubImg] = useState(""); // 서버 요청용
  const [name, setName] = useState("username"); // 이름 상태
  const [toggle, setToggle] = useState(false); // 편집 버튼 상태
  const [toastVisible, setToastVisible] = useState(false); // 토스트 상태
  const [message, setMessage] = useState(""); // 토스트 메세지
  const [isAdmin, setIsAdmin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userRole"]);

  useEffect(() => {
    const fetchData = async () => {
      await TokenReq("/users/getInfo")
        .then((res) => res.data.result)
        .then((userData) => {
          setProfileImg(userData.profileImage);
          setSubImg(userData.profileImage);
          setName(userData.nickname);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    cookies.userRole === "ADMIN" && setIsAdmin(true);
  }, [cookies.userRole]);

  const handleImg = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      setSubImg(file);

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
    const regex = /^[a-zA-Z0-9가-힣]*$/; // 한글, 영문, 숫자 정규식

    // 닉네임 유효성 검사
    if (name.length > 15 || name.length < 1) {
      setMessage(
        <div>이름은 최소 1자 이상, 최대 15자 이내로 입력해주세요.</div>
      );
      setToastVisible(true); // 토스트 컴포넌트 호출
      return;
    } else if (!regex.test(name)) {
      setMessage(<div>이름은 한글, 영문, 숫자만 입력해주세요.</div>);
      setToastVisible(true); // 토스트 컴포넌트 호출
      return;
    }

    setToggle(!toggle);
    toggle &&
      (postData(subImg, name),
      setMessage(<CheckMsg msg="변경이 완료되었습니다" />),
      setToastVisible(true));
  };

  const postData = async (img, name) => {
    console.log(img, name);

    const formData = new FormData();
    if (img.length === undefined) {
      formData.append("profileImage", img);
    }
    formData.append("nickname", name);

    await TokenReq.patch("/users/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const logout = async () => {
    try {
      removeCookie("userRole", { path: "/" });
      await TokenReq.post("/auth/logout");
      console.log("로그아웃 성공");
    } catch (error) {
      console.log("로그아웃 실패: ", error);
    }
  };

  const signout = async () => {
    try {
      removeCookie("userRole", { path: "/" });
      await TokenReq.delete("/users/signOut");
      console.log("회원탈퇴 성공");
    } catch (error) {
      console.log("회원탈퇴 실패: ", error);
    }
  };

  return (
    <Container>
      {/* 토스트 컴포넌트 */}
      {toastVisible && (
        <Toast message={message} setToastVisible={setToastVisible} />
      )}

      {/* 프로필 */}
      {!isAdmin && (
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
              maxLength={15}
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
      )}

      {/* 로그아웃 */}
      <Linkbox name="로그아웃" addr="/login" handler={logout} />

      {/* 회원탈퇴 */}
      <Linkbox name="회원탈퇴" addr="/login" handler={signout} />

      {/* 관리자 페이지 */}
      {isAdmin && (
        <Linkbox name="관리자 페이지" addr="/admin" handler={() => {}} />
      )}
    </Container>
  );
}
export default Setting;
