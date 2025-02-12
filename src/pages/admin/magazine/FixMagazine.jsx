import { useForm } from "react-hook-form";
import styled from "styled-components";

import { GoArrowLeft } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { theme } from "../../../styles/themes";
import DetailBox from "../../../components/admin/DetailBox";
import ImgBox from "../../../components/admin/ImgBox";
import DeleteBtn from "../../../components/admin/DeleteBtn";
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

export default function FixMagazine({ mag, setPage }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { title: mag.title, iconUrl: mag.iconUrl },
  });

  const HandleLeftBtn = () => setPage("main");

  const submit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      if (data.iconUrl.length === 1) {
        formData.append("iconFile", data.iconUrl[0]);
      }

      await TokenReq.put(`/admin/magazines/${mag.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPage("main");
    } catch (error) {
      console.log("매거진 추가 중 오류 발생: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Header>
          <Btn onClick={HandleLeftBtn}>
            <GoArrowLeft size={28} color={theme.Sub1} />
          </Btn>
          <Title>매거진 관리</Title>
          <Btn type="submit">
            <IoCheckmark size={28} color={theme.Sub1} />
          </Btn>
        </Header>
        <DetailBox name="브랜드명" regId="title" register={register} />
        <ImgBox
          name="대표 이미지"
          regId="iconUrl"
          register={register}
          img={mag.iconUrl}
        />
      </form>
      <DeleteBtn id={mag.id} setPage={setPage} kind="magazine" />
    </div>
  );
}
