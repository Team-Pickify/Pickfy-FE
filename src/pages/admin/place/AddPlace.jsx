import { useForm } from "react-hook-form";
import styled from "styled-components";

import { GoArrowLeft } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { theme } from "../../../styles/themes";
import DetailBox from "../../../components/admin/DetailBox";
import DropdownBox from "../../../components/admin/DropdownBox";
import PlaceImgBox from "../../../components/admin/PlaceImgBox";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  height: 6.5rem;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;

  position: sticky;
  top: 0;
  z-index: 9999;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Btn = styled.div`
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const options1 = ["opt1", "opt2", "opt3", "opt4"];
const options2 = ["optA", "optB", "optC", "optD"];

export default function AddPlace({ place, setPlace, setPage }) {
  const { register, handleSubmit } = useForm();

  const submit = (data) => {
    console.log(data);
    setPlace([...place, { name: data["플레이스명"], addr: data["위치"] }]);
    setPage("main");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Header>
          <Btn onClick={() => setPage("main")}>
            <GoArrowLeft size={28} color={theme.Sub1} />
          </Btn>
          <Title>플레이스 관리</Title>
          <Btn onClick={() => setPage("main")}>
            <IoCheckmark size={28} color={theme.Sub1} />
          </Btn>
        </Header>

        <DropdownBox
          register={register}
          name="카테고리"
          kind="카테고리 선택"
          options={options1}
        />
        <DropdownBox
          register={register}
          name="매거진"
          kind="매거진 선택"
          options={options2}
        />
        <DetailBox register={register} name="플레이스명" />
        <DetailBox register={register} name="한줄소개" />
        <DetailBox register={register} name="위치" />
        <DetailBox register={register} name="인스타그램" />
        <DetailBox register={register} name="지도 링크" />
        <PlaceImgBox register={register} name="이미지" />
      </form>
    </div>
  );
}
