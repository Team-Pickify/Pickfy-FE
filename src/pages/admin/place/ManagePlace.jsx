import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { GoArrowLeft } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { theme } from "../../../styles/themes";

import AddPlace from "./AddPlace";
import FixPlace from "./FixPlace";
import PlaceBox from "../../../components/admin/PlaceBox";

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
  const [place, setPlace] = useState([
    { name: "플레이스명A", addr: "서울특별시 00구 00로 00번길 00" },
    { name: "플레이스명B", addr: "서울특별시 00구 00로 00번길 01" },
  ]);
  const [page, setPage] = useState("main");
  const [selectedPlace, setSelectedPlace] = useState({ name: "", addr: "" });
  const navigate = useNavigate();
  const handleNav = (address) => navigate(address);

  const HandlePlace = (idx) => {
    setSelectedPlace(place[idx]);
    setPage("fix");
  };

  return (
    <div>
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
          {place.map((v, idx) => {
            return (
              <div key={idx} onClick={() => HandlePlace(idx)}>
                <PlaceBox name={v.name} addr={v.addr} />
              </div>
            );
          })}
        </div>
      ) : page === "add" ? (
        <AddPlace place={place} setPlace={setPlace} setPage={setPage}/>
      ) : (
        <FixPlace />
      )}
    </div>
  );
}
