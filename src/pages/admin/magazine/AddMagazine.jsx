import { useForm } from "react-hook-form";
import styled from "styled-components";

import DetailBox from "../../../components/admin/DetailBox";
import ImgBox from "../../../components/admin/ImgBox";
import { theme } from "../../../styles/themes";
import { GoArrowLeft } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { TokenReq } from "../../../apis/axiosInstance";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  height: 6.5rem;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Btn = styled.button`
  all: unset;
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AddMagazine({ setPage }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("iconFile", data.iconUrl[0]);

      await TokenReq.post("/admin/magazines", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPage("main");
    } catch (error) {
      console.log("매거진 추가 중 오류 발생: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Btn
            onClick={() => {
              setPage("main");
            }}
          >
            <GoArrowLeft size={28} color={theme.Sub1} />
          </Btn>
          <Title>매거진 관리</Title>
          <Btn type="submit">
            <IoCheckmark size={28} color={theme.Sub1} />
          </Btn>
        </Header>
        <DetailBox name="브랜드명" regId="title" register={register} />
        <ImgBox name="대표 이미지" regId="iconUrl" register={register} img="" />
      </form>
    </div>
  );
}
