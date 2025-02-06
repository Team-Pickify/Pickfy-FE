import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import DetailBox from "../../../components/admin/DetailBox";
import DropdownBox from "../../../components/admin/DropdownBox";
import PlaceImgBox from "../../../components/admin/PlaceImgBox";
import DeleteBtn from "../../../components/admin/DeleteBtn";
import AddressBox from "../../../components/admin/\bAddressBox";

import { theme } from "../../../styles/themes";
import { GoArrowLeft } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";

import { TokenReq } from "../../../apis/axiosInstance";
import { TransAddr, TransCoords } from "../../../hooks/useMapInfo";

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

export default function FixPlace({ selectedPlace, setPage }) {
  const [magazine, setMagazine] = useState(null);
  const [category, setCategory] = useState(null);
  const [images, setImages] = useState([...selectedPlace.placeImageUrl]);

  // 선택한 장소 정보 불러오기
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: selectedPlace.name,
      shortDescription: selectedPlace.shortDescription,
      address: "",
      instagramLink: selectedPlace.instagramLink,
      naverPlaceLink: selectedPlace.naverLink,
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
    },
  });

  // 선택한 장소의 위도, 경도값을 이용하여 주소명으로 변경 후 useForm에 설정
  useEffect(() => {
    const fetchAddr = async () => {
      const addr = await TransAddr(
        selectedPlace.latitude,
        selectedPlace.longitude
      );

      reset((prevValues) => ({
        ...prevValues,
        address: addr,
      }));
    };
    fetchAddr();
  }, [selectedPlace.latitude, selectedPlace.longitude, reset]);

  // 선택한 장소의 카테고리, 매거진 id값 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [magazineData, categoryData] = await Promise.all([
          TokenReq.get("/magazines"),
          TokenReq.get("/categories"),
        ]);

        const magazines = magazineData.data.result.map((v) => ({
          id: v.id,
          title: v.title,
        }));
        const categories = categoryData.data.result.map((v) => ({
          id: v.id,
          title: v.name,
        }));

        setMagazine(
          magazines.find((v) => v.title === selectedPlace.magazineTitle)?.id
        );
        setCategory(
          categories.find((v) => v.title === selectedPlace.categoryName)?.id
        );
      } catch (error) {
        console.error("데이터 로딩 중 에러:", error);
      }
    };

    fetchData();
  }, [selectedPlace]);

  const submit = async (data) => {
    try {
      data = { ...data, category: category, magazine: magazine, image: images };

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
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await TokenReq.patch(`/places/admin/${selectedPlace.placeId}`, formData, {
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

        {category !== null && (
          <DropdownBox name="카테고리" val={category} setVal={setCategory} />
        )}
        {magazine !== null && (
          <DropdownBox name="매거진" val={magazine} setVal={setMagazine} />
        )}
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
        <DeleteBtn id={selectedPlace.placeId} setPage={setPage} kind="place" />
      </form>
    </div>
  );
}
