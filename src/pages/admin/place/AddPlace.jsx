import { useForm } from "react-hook-form";
import styled from "styled-components";

import { GoArrowLeft } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { theme } from "../../../styles/themes";
import DetailBox from "../../../components/admin/DetailBox";
import DropdownBox from "../../../components/admin/DropdownBox";
import PlaceImgBox from "../../../components/admin/PlaceImgBox";
import { useState } from "react";
import { TokenReq } from "../../../apis/axiosInstance";
import AddressBox from "../../../components/admin/AddressBox";
import { TransCoords } from "../../../hooks/useMapInfo";

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

const Btn = styled.button`
  all: unset;
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AddPlace({ setPage }) {
  const [category, setCategory] = useState();
  const [magazine, setMagazine] = useState();
  const [images, setImages] = useState([]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      shortDescription: "",
      address: "",
      instagramLink: "",
      naverPlaceLink: "",
      latitude: 0,
      longitude: 0,
      category: "",
      magazine: "",
      image: [],
    },
  });

  const submit = async (data) => {
    try {
      data = { ...data, category: category, magazine: magazine, image: images };

      // 주소->좌표 변환
      const coords = await TransCoords(data.address);
      data.latitude = coords.latitude;
      data.longitude = coords.longitude;

      const formData = new FormData();

      const jsonData = JSON.stringify({
        name: data.name,
        shortDescription: data.shortDescription,
        address: data.address,
        instagramLink: data.instagramLink,
        naverPlaceLink: data.naverPlaceLink,
        latitude: data.latitude,
        longitude: data.longitude,
        categoryId: data.category,
        magazineId: data.magazine,
      });

      formData.append(
        "request",
        new Blob([jsonData], { type: "application/json" })
      );

      data.image.forEach((file) => {
        formData.append("image", file);
      });

      await TokenReq.post("/admin/places", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPage("main");
    } catch (error) {
      console.log("플레이스 추가 에러:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Header>
          <Btn onClick={() => setPage("main")}>
            <GoArrowLeft size={28} color={theme.Sub1} />
          </Btn>
          <Title>플레이스 관리</Title>
          <Btn type="submit">
            <IoCheckmark size={28} color={theme.Sub1} />
          </Btn>
        </Header>

        <DropdownBox name="카테고리" val={category} setVal={setCategory} />
        <DropdownBox name="매거진" val={magazine} setVal={setMagazine} />
        <DetailBox register={register} name="플레이스명" regId="name" />
        <DetailBox
          register={register}
          name="한줄소개"
          regId="shortDescription"
        />
        <AddressBox register={register} name="위치" regId="address" />
        <DetailBox
          register={register}
          name="인스타그램"
          regId="instagramLink"
        />
        <DetailBox
          register={register}
          name="지도 링크"
          regId="naverPlaceLink"
        />
        <PlaceImgBox images={images} setImages={setImages} />
      </form>
    </div>
  );
}
