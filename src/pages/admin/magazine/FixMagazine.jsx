import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { GoArrowLeft } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { theme } from "../../../styles/themes";
import DetailBox from "../../../components/admin/DetailBox";
import ImgBox from "../../../components/admin/ImgBox";

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

export default function FixMagazine({ list, setList, setPage, brandIdx }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { 브랜드명: list[brandIdx], "대표 이미지": "" },
  });

  const HandleLeftBtn = () => setPage("main");
  const submit = (data) => {
    console.log("remove: ", data);

    const newList = list.map((v, idx) => {
      return brandIdx === idx ? data["브랜드명"] : v;
    });
    setList(newList);
    setPage("main");
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
        <DetailBox name="브랜드명" register={register} />
        <ImgBox name="대표 이미지" register={register} />
      </form>
    </div>
  );
}
