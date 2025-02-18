import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { GoArrowLeft } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { theme } from "../../../styles/themes";

import AddPlace from "./AddPlace";
import FixPlace from "./FixPlace";
import PlaceBox from "../../../components/admin/PlaceBox";
import { TokenReq } from "../../../apis/axiosInstance";

const Wrapper = styled.div`
  background-color: white;
  padding-bottom: 1rem;
`;

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

const Btn = styled.div`
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ManagePlace() {
  const [place, setPlace] = useState([]);
  const [page, setPage] = useState("main");
  const [selectedPlace, setSelectedPlace] = useState();
  const navigate = useNavigate();
  const handleNav = (address) => navigate(address);

  useEffect(() => {
    TokenReq.get("/admin/places")
      .then((res) => res.data.result)
      .then((data) => {
        setPlace(data);
      });
  }, [page, setPage]);

  const HandlePlace = (placeId) => {
    setSelectedPlace(placeId);
    setPage("fix");
  };

  return (
    <Wrapper>
      {page === "main" ? (
        <div>
          <Header>
            <Btn onClick={() => handleNav(-1)}>
              <GoArrowLeft size={28} color={theme.Sub1} />
            </Btn>
            <Title>플레이스 관리</Title>
            <Btn onClick={() => setPage("add")}>
              <GoPlus size={28} color={theme.Sub1} />
            </Btn>
          </Header>

          {place.map((v) => {
            return (
              <div key={v.placeId} onClick={() => HandlePlace(v.placeId)}>
                <PlaceBox name={v.name} addr={v.shortDescription} />
              </div>
            );
          })}
        </div>
      ) : page === "add" ? (
        <AddPlace setPage={setPage} />
      ) : (
        <FixPlace
          selectedPlace={place.find((v) => v.placeId === selectedPlace)}
          setPage={setPage}
        />
      )}
    </Wrapper>
  );
}
